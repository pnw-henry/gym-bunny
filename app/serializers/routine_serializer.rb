class RoutineSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :muscle_group, :owner, :is_public
  has_many :exercise_sets
  has_many :exercises, through: :exercise_sets
end
