class CreateDays < ActiveRecord::Migration[5.2]
  def change
    create_table :days do |t|
      t.date :date
      t.string :pickup_day_of_week
      t.string :pickup_week

      t.belongs_to :zone
    end
  end
end
