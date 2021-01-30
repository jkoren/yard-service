class Api::V1::StreetsController < ApplicationController

  def index
    search_term = params["name"].upcase
    streets = Street.where('name like ?', "%"+ search_term + "%")
    render json: streets, each_serializer: StreetIndexSerializer
  end

end
