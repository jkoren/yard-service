class Segment < ApplicationRecord
  belongs_to :zone
  belongs_to :street

  def name
    street.name
  end
end
