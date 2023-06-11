class ExerciseSetSerializer < ActiveModel::Serializer
  attributes :id, :exercise_id, :routine_id, :reps, :set_number
  belongs_to :exercise
end
