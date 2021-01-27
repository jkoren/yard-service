class Api::V1::StreetsController < ApplicationController

  def index
    # search_term = params["street"].upcase
    # @streets = Street.where('name like ?', "%"+ search_term + "%")
    streets = Street.all
    render json: streets
  end

end
