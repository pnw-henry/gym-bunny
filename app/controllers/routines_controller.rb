class RoutinesController < ApplicationController

    def index
        routines = Routine.all
        render json: routines, include: [:exercise_sets, :exercises]
    end

    def show
        routine = Routine.find_by(id: params[:id])
        render json: routine, include: [:exercise_sets, :exercises]
    end

    def create
        routine = Routine.create(routine_params)
        render json: routine
    end

    def update
        routine = Routine.find_by(id: params[:id])
        routine.routine_photo.attach(params[:routine_photo])
        routine.save
        render json: routine
    end

    def destroy
        routine = Routine.find_by(id: params[:id])
        routine.destroy
        render json: routine
    end

    private

    def routine_params
        params.permit(:name, :description, :muscle_group, :is_public, :owner, :routine_photo)
    end
end
