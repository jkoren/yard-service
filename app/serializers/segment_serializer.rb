class SegmentSerializer < ActiveModel::Serializer 
  attributes :id, :lowest_num_on_segment, :highest_num_on_segment, :zone_number, :zone_pickup_week, :zone_pickup_day_of_week, :addresses, :zone_pickup_days

  belongs_to :zone
  belongs_to :street
  has_many :addresses, each_serializer: AddressSerializer
  has_many :days, each_serializer: DaySerializer

  def zone_number 
    self.object.zone.number
  end

  def zone_pickup_week 
    self.object.zone.pickup_week
  end
  
  def zone_pickup_day_of_week 
    self.object.zone.pickup_day_of_week
  end

  def zone_pickup_days
    self.object.zone.days
  end

# https://itnext.io/a-quickstart-guide-to-using-serializer-with-your-ruby-on-rails-api-d5052dea52c5

end
