class SweatsController < ApplicationController
    
    def index
        sweats = Sweat.all
        render json: sweats, include: [:user, :exercise, :routine]
    end
    
    def show
        sweat = Sweat.find_by(id: params[:id])
        render json: sweat, include: [:user, :exercise, :routine]
    end
    
    def create
        sweat = Sweat.create(sweat_params)
        render json: sweat
    end
    
    def update
        sweat = Sweat.find_by(id: params[:id])
        sweat.update(sweat_params)
        render json: sweat
    end
    
    def destroy
        sweat = Sweat.find_by(id: params[:id])
        sweat.destroy
        render json: sweat
    end
    
    private
    
    def sweat_params
        params.require(:sweat).permit(:user_id, :exercise_id, :routine_id, :workout_id, :date, :weight, :reps, :sets)
    end
end
