class ExerciseSet < ApplicationRecord
    belongs_to :routine
    belongs_to :exercise

    validates :set_number, presence: true, numericality: { greater_than: 0 }
    validates :reps, presence: true, numericality: { greater_than: 0 }
    validates :routine_id, presence: true
    validates :exercise_id, presence: true
end
