class CreateZones < ActiveRecord::Migration[5.2]
  def change
    create_table :zones do |t|
      t.integer :number, null: false
      t.integer :pickup_day_of_week
      t.string :pickup_week
    end
  end
end
