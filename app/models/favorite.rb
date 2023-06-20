class Favorite < ApplicationRecord
    belongs_to :user
    belongs_to :routine

    validates :user_id, presence: true
    validates :routine_id, presence: true
end
