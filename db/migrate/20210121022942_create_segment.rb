class CreateSegment < ActiveRecord::Migration[5.2]
  def change
    create_table :segments do |t|
      t.integer :lowest_num_on_segment
      t.integer :highest_num_on_segment

      t.belongs_to :street, null: false
      t.belongs_to :zone, null: false
    end
  end
end
