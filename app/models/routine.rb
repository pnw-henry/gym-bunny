class Routine < ApplicationRecord
    has_many :sweats
    has_many :workouts
    has_many :exercise_sets
    has_many :users, through: :workouts
    has_many :exercises, through: :exercise_sets

    MUSCLE_GROUP = ["Arms", "Back", "Chest", "Core", "Legs", "Shoulders"]

    validates :name, presence: true, length: { maximum: 20 }
    validates :description, presence: true, length: { maximum: 500 }
    validates :muscle_group, presence: true, inclusion: { in: MUSCLE_GROUP, message: "must be one of: #{MUSCLE_GROUP.join(', ')}"}
end
