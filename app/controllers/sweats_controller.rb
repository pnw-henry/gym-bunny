class SweatsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    before_action :authorize
    
    def create
        sweat = Sweat.create!(sweat_params)
        render json: sweat
    end
    
    def update
        sweat = Sweat.find_by(id: params[:id])
        sweat.update!(sweat_params)
        render json: sweat
    end
    
    def destroy
        sweat = Sweat.find_by(id: params[:id])
        sweat.destroy
        render json: sweat
    end
    
    private

    def find_sweat
        Sweat.find(params[:id])
    end

    def authorize
        return render json: {error: "Please login first"}, status: :unauthorized unless session.include? :user_id
    end
    
    def sweat_params
        params.require(:sweat).permit(:user_id, :exercise_id, :routine_id, :workout_id, :date, :weight, :reps, :sets)
    end

    def render_unprocessable_entity_response(exception)
        render json: {errors: exception.record.errors.full_messages}, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Workout data not found" }, status: :not_found
    end
end
