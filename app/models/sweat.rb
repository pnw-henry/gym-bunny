class Sweat < ApplicationRecord
    belongs_to :user
    belongs_to :routine
    belongs_to :exercise

    validates :weight, numericality: { greater_than_or_equal_to: 0 }
    validates :reps, numericality: { greater_than: 0 }
    validates :sets, numericality: { greater_than: 0 }
    validates :routine_id, presence: true
    validates :user_id, presence: true
    validates :exercise_id, presence: true
end
