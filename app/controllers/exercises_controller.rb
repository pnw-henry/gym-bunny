class ExercisesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        exercises = Exercise.all
        render json: exercises, include: :exercise_sets
    end

    def show
        exercise = find_exercise
        render json: exercise, include: :exercise_sets
    end

    def create
        exercise = Exercise.create(exercise_params)
        render json: exercise
    end

   def update
        exercise = Exercise.find_by(id: params[:id])
        exercise.exercise_photo.attach(params[:exercise_photo])
        exercise.save
        render json: exercise
   end

    private

    def find_exercise
        Exercise.find(params[:id])
    end

    def exercise_params
        params.permit(:name, :description, :exercise_photo)
    end

    def render_unprocessable_entity_response(exception)
        render json: {errors: exception.record.errors.full_messages}, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Exercise not found" }, status: :not_found
    end
end
