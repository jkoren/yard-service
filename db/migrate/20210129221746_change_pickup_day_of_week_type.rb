class ChangePickupDayOfWeekType < ActiveRecord::Migration[5.2]

  def up
    change_table :zones do |t|
      t.change :pickup_day_of_week, :string
    end
  end

  def down
    change_table :zones do |t|
      t.change :pickup_day_of_week, :integer
    end
  end

end