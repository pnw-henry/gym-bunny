class RoutineSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :description, :muscle_group, :owner, :is_public, :routine_photo
  has_many :exercise_sets
  has_many :exercises, through: :exercise_sets

  def routine_photo
    rails_blob_path(object.routine_photo, only_path: true) if object.routine_photo.attached?
  end
end
