puts("erasing zones, segments, streets, calendar & addresses...")
zones = Zone.all
zones.destroy_all

segments = Segment.all
segments.destroy_all

streets = Street.all
streets.destroy_all

addresses = Address.all
addresses.destroy_all

days = Day.all
days.destroy_all

csv_path = File.join(Rails.root, 'db', 'seed')
# https://stackoverflow.com/questions/36350321/errnoenoent-no-such-file-or-directory-rb-sysopen


puts("creating segments, streets & zones...")

# create segments table from CSV (each is a segment of a street)
# create zones & streets along the way
csv_file = File.read(File.join(csv_path, "Segments.csv"))
csv_segments = CSV.parse(csv_file, headers: true) 
csv_segments = csv_segments.sort_by { |csv_segments| csv_segments["STREETNAME"] }

csv_file = File.read(File.join(csv_path, "Zones.csv"))
csv_zones = CSV.parse(csv_file, headers: true) 


city = "WALTHAM"
state = "MA"

csv_segments.each { |csv_segment|
  zone = Zone.find_or_create_by(number: csv_segment["zone"].to_i, city: city, state: state)
  street = Street.find_or_create_by(name: csv_segment["STREETNAME"])
  
  segment = Segment.new
  low = csv_segment["lowest_number_on_segment"].to_i
  high = csv_segment["highest_number_on_segment"].to_i
  segment.lowest_num_on_segment = (low == 0 ? 0 : low)
  segment.highest_num_on_segment = (high == 0 ? 1000000 : high)
  segment.street = street
  segment.zone = zone
  segment.save
}

zones.each {|zone|
  csv_zones.each { |csv_zone|
    if csv_zone["zone_number"].to_i == zone.number
      puts("populating zone "+ zone.number.to_s + "...")
      zone.pickup_week = csv_zone["pickup_week"]
      zone.pickup_day_of_week = csv_zone["pickup_day_of_week"]
      zone.save
    end
  }
}

puts("creating calendar...")
csv_file = File.read(File.join(csv_path, "Holidays.csv"))
csv_holidays = CSV.parse(csv_file, headers: true) 

csv_file = File.read(File.join(csv_path, "Year.csv"))
csv_year = CSV.parse(csv_file, headers: true) 

sunday_1st_wk =  Date.parse(csv_year["sunday_1st_wk"].first)
sunday_last_wk =  Date.parse(csv_year["sunday_last_wk"].first)
saturday_last_wk = sunday_last_wk + 6

holidays = csv_holidays["holidays"].map { |holiday| Date.parse(holiday) }

pickup_week = "A"
date = sunday_1st_wk
days_of_week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" 
]
while date < saturday_last_wk
  pickup_days_of_week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
  days_of_week.each { |day_of_week| 
    day = Day.new(date: date)
    if !holidays.include?(date)
      pickup_day_of_week = pickup_days_of_week.shift
      zone = Zone.find_by(pickup_day_of_week: pickup_day_of_week, pickup_week: pickup_week)
      if zone
        day.zone = zone
      end
    end
    day.save
    date += 1
  }
  pickup_week = (pickup_week == "A" ? "B" : "A")
end

puts("creating addresses...")
errors = []
csv_file = File.read(File.join(csv_path, "Addresses.csv"))
addresses = CSV.parse(csv_file, headers: true) 
addresses = addresses.sort_by { |address| [address["STREETNAME"],address["ADDR_NUM"]] }
previous_address = addresses.shift()
puts "processing "+previous_address["ADDRESS"]
addresses.each { |address| 
  # need to eliminate duplicate addresses (when address is duplicated - eg 425 Waverley Oaks Road)
  if address["ADDRESS"] != previous_address["ADDRESS"]
    puts "processing "+address["ADDRESS"]
    new_address = Address.new
    new_address.number = address["ADDR_NUM"].to_i
    new_address.zip_code = address["ZIPCODE"]
    street = Street.find_by(name: address["STREETNAME"])
    if street.segments.count == 1
      segment = street.segments.first
    else
      street.segments.each { |the_segment|
        if new_address.number.to_i >= the_segment.lowest_num_on_segment && 
          new_address.number.to_i <= the_segment.highest_num_on_segment 
          segment = the_segment
        end
      }
    end
    if segment == nil 
      puts "error - segment not found"
      errors.push("error - segment not found " + address["ADDRESS"])
    else
      new_address.segment = segment 
      if new_address.segment.name < "K" # heroku has a limit of 10,000 records on lowest tier
        new_address.save
      end
    end
  end
  previous_address = address
}    
puts addresses.count.to_s+ " addresses processed into "+zones.count.to_s+" zones."