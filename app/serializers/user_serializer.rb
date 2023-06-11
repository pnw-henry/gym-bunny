class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :profile_photo, :username, :password
  has_many :favorites
  has_many :workouts
end
