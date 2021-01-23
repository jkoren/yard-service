class Address < ApplicationRecord
  belongs_to :segment
  
  def self.search(search)
    # https://stackoverflow.com/questions/22970699/rails-search-query-associated-model
    binding.pry
    if search
      joins(:segment).where('segments.name LIKE ?', "%#{search}%")
    else
      find(:all)
    end
  end
  
end