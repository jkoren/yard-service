class DaySerializer < ActiveModel::Serializer 
  attributes :id, :date, :formatted_date
  belongs_to :zone

# https://itnext.io/a-quickstart-guide-to-using-serializer-with-your-ruby-on-rails-api-d5052dea52c5

  def formatted_date
    self.object.date.strftime('%A, %b %d')
  end
end
