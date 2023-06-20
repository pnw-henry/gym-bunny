class ExerciseSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :muscle_target, :description, :photo, :exercise_photo
  has_many :exercise_sets

  def exercise_photo
    rails_blob_path(object.exercise_photo, only_path: true) if object.exercise_photo.attached?
  end


end
