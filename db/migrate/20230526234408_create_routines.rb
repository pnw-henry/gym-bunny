class CreateRoutines < ActiveRecord::Migration[7.0]
  def change
    create_table :routines do |t|
      t.string :name
      t.string :muscle_group
      t.string :description
      t.boolean :is_public
      t.string :owner
      t.string :photo_file_name
      t.binary :photo

      t.timestamps
    end
  end
end
