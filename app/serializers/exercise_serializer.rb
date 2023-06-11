class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :muscle_target, :description, :photo
  has_many :exercise_sets
end
