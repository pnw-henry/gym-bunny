class CreateSweats < ActiveRecord::Migration[7.0]
  def change
    create_table :sweats do |t|
      t.integer :weight
      t.integer :reps
      t.integer :sets
      t.integer :routine_id
      t.integer :user_id
      t.integer :exercise_id
      t.integer :workout_id

      t.timestamps
    end
  end
end
