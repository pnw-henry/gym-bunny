class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :date, :time, :calories_burned, :user_id, :routine_id
  belongs_to :user
  belongs_to :routine
end
