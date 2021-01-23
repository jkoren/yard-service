class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.string :number

      t.belongs_to :segment, null: false
    end
  end
end
