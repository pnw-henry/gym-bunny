class WorkoutsController < ApplicationController
    
        def index
            workouts = Workout.all
            render json: workouts, include: [:user, :routine]
        end
    
        def show
            workout = Workout.find_by(id: params[:id])
            render json: workout, include: [:user, :routine]
        end
    
        def create
            workout = Workout.create(workout_params)
            render json: workout
        end
    
        def update
            workout = Workout.find_by(id: params[:id])
            workout.update(workout_params)
            render json: workout
        end
    
        def destroy
            workout = Workout.find_by(id: params[:id])
            workout.destroy
            render json: workout
        end
    
        private
    
        def workout_params
            params.permit(:date, :duration, :calories_burned, :user_id, :routine_id)
        end
end
