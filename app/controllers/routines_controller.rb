class RoutinesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        routines = Routine.all
        render json: routines, include: [:exercise_sets, :exercises]
    end

    def show
        routine = find_routine
        render json: routine, include: [:exercise_sets, :exercises]
    end

    def update
        routine = Routine.find_by(id: params[:id])
        routine.routine_photo.attach(params[:routine_photo])
        routine.save
        render json: routine
    end

    private

    def find_routine
        Routine.find(params[:id])
    end

    def routine_params
        params.permit(:name, :description, :muscle_group, :is_public, :owner, :routine_photo)
    end

    def render_unprocessable_entity_response(exception)
        render json: {errors: exception.record.errors.full_messages}, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Routine Not Found" }, status: :not_found
    end
end
