class ExercisesController < ApplicationController

    def index
        exercises = Exercise.all
        render json: exercises, include: :exercise_sets
    end

    def show
        exercise = Exercise.find_by(id: params[:id])
        render json: exercise, include: :exercise_sets
    end

    def create
        exercise = Exercise.create(exercise_params)
        render json: exercise
    end

    def update
        exercise = Exercise.find_by(id: params[:id])
        exercise.update(exercise_params)
        render json: exercise
    end

    def destroy
        exercise = Exercise.find_by(id: params[:id])
        exercise.destroy
        render json: exercise
    end

    private

    def exercise_params
        params.permit(:name, :description, :user_id)
    end
end
