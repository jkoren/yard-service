class AddressSerializer < ActiveModel::Serializer 
  attributes :id, :number
  belongs_to :segment

# https://itnext.io/a-quickstart-guide-to-using-serializer-with-your-ruby-on-rails-api-d5052dea52c5

end
