class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :email, :username, :avatar
  has_many :favorites
  has_many :workouts
  has_many :sweats

  def avatar
    rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
  end
end
