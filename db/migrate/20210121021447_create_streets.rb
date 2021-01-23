class CreateStreets < ActiveRecord::Migration[5.2]
  def change
    create_table :streets do |t|
      t.text :name
      t.text :notes
    end
  end
end
