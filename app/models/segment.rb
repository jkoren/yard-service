class Segment < ApplicationRecord
  belongs_to :zone
  belongs_to :street
  has_many :addresses

  def name
    street.name
  end
end
