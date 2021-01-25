class StreetsController < ApplicationController

  def index
    search_term = params["street"].upcase
    @streets = Street.where('name like ?', "%"+ search_term + "%")
  end

end
