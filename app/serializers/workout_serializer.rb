class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :date, :duration, :calories_burned, :user_id, :routine_id
  belongs_to :user
  belongs_to :routine
end
