class CreateExercises < ActiveRecord::Migration[7.0]
  def change
    create_table :exercises do |t|
      t.string :name
      t.string :muscle_target
      t.string :description
      t.string :photo_file_name
      t.binary :photo

      t.timestamps
    end
  end
end
