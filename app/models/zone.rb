class Zone < ApplicationRecord
  has_many :segments
  has_many :days
end
