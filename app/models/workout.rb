class Workout < ApplicationRecord
    belongs_to :user
    belongs_to :routine

    validates :date, presence: true, date: { before: Proc.new { Date.tomorrow } }
    validates :time, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :calories_burned, numericality: { greater_than_or_equal_to: 0 }
    validates :user_id, presence: true
    validates :routine_id, presence: true

end
