class SweatSerializer < ActiveModel::Serializer
  attributes :id, :weight, :reps, :sets, :routine_id, :user_id, :exercise_id, :workout_id, :created_at
  belongs_to :user
  belongs_to :routine
  belongs_to :exercise
  belongs_to :workout
end
