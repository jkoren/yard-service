class StreetIndexSerializer < ActiveModel::Serializer 
  attributes :id, :name
  has_many :segments

# https://itnext.io/a-quickstart-guide-to-using-serializer-with-your-ruby-on-rails-api-d5052dea52c5

end
