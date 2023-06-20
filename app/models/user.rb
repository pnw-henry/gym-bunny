class User < ApplicationRecord
    has_many :workouts
    has_many :sweats
    has_many :routines, through: :workouts
    has_many :favorites

    has_secure_password
    has_one_attached :avatar

    validates :name, presence: true, format: { with: /\A[a-zA-Z]+\z/, message: "only allows letters" }
    validates :email, presence: true, uniqueness: true, confirmation: { case_sensitive: false }
    validates :email_confirmation, presence: true
    validates :username, presence: true, uniqueness: true
end
