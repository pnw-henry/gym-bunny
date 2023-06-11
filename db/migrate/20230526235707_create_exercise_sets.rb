class CreateExerciseSets < ActiveRecord::Migration[7.0]
  def change
    create_table :exercise_sets do |t|
      t.integer :set_number
      t.integer :reps
      t.integer :routine_id
      t.integer :exercise_id

      t.timestamps
    end
  end
end
