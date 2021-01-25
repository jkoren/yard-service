class Address < ApplicationRecord
  belongs_to :segment

  def name
    segment.street.name
  end

  def city
    segment.zone.city
  end

  def state
    segment.zone.state
  end

  def display_address
    number + " " + segment.street.name + "  " + segment.zone.city + " " + segment.zone.state
  end
  
end