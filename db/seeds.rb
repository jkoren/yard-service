puts("erasing zones, segments, streets & addresses...")
zones = Zone.all
zones.destroy_all

segments = Segment.all
segments.destroy_all

streets = Street.all
streets.destroy_all

addresses = Address.all
addresses.destroy_all

puts("creating segments, streets & zones...")
csv_path = File.join(Rails.root, 'db', 'seed')
# https://stackoverflow.com/questions/36350321/errnoenoent-no-such-file-or-directory-rb-sysopen

# create segments table from CSV (each is a segment of a street)
# create zones & streets along the way
csv_file = File.read(File.join(csv_path, "Segments.csv"))
csv_segments = CSV.parse(csv_file, headers: true) 
csv_segments = csv_segments.sort_by { |csv_segments| csv_segments["STREETNAME"] }

city = "Waltham"
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
      binding.pry
      errors.push("error - segment not found " + address["ADDRESS"])
    else
      new_address.segment = segment 
      new_address.save
    end
  end
  previous_address = address
}    

formatted_address_count = addresses.count.to_s.reverse.scan(/.{1,3}/).join(',').reverse
puts formatted_address_count+ " addresses processed into "+zones.count+" zones."
binding.pry #look at errors