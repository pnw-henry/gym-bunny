class Exercise < ApplicationRecord
    has_many :exercise_sets
    has_many :sweats
    has_many :routines, through: :exercise_sets

    MUSCLE_TARGET = ["Arms", "Back", "Chest", "Core", "Legs", "Shoulders"]

    validates :muscle_target, presence: true, inclusion: { in: MUSCLE_TARGET, message: "must be one of: #{MUSCLE_TARGET.join(', ')}"}
    validates :description, presence: true
end
