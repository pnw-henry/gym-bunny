class WorkoutsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    before_action :authorize
    
    def index
        workouts = Workout.all
        render json: workouts, include: [:user, :routine, :sweats]
    end
    
    def show
        workout = find_workout
        render json: workout, include: [:user, :routine, :sweats]
    end
    
    def create
        workout = Workout.create!(workout_params)
        render json: workout, include: [:user, :routine, :sweats]
    end
    
    def update
        workout = Workout.find_by(id: params[:id])
        workout.update!(workout_params)
        render json: workout, include: [:user, :routine, :sweats]
    end
    
    def destroy
        workout = Workout.find_by(id: params[:id])
        workout.destroy
        render json: workout
    end
    
    private

    def find_workout
        Workout.find(params[:id])
    end

    def authorize
        return render json: {error: "Please login first"}, status: :unauthorized unless session.include? :user_id
    end
    
    def workout_params
        params.permit(:date, :duration, :notes, :calories_burned, :user_id, :routine_id)
    end

    def render_unprocessable_entity_response(exception)
        render json: {errors: exception.record.errors.full_messages}, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Workout not found" }, status: :not_found
    end
end
