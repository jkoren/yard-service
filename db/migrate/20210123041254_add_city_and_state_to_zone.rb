class AddCityAndStateToZone < ActiveRecord::Migration[5.2]
  def change
    add_column :zones, :city, :string
    add_column :zones, :state, :string
  end
end
