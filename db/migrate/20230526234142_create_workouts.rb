class CreateWorkouts < ActiveRecord::Migration[7.0]
  def change
    create_table :workouts do |t|
      t.date :date
      t.integer :time
      t.integer :calories_burned
      t.integer :user_id
      t.integer :routine_id

      t.timestamps
    end
  end
end
