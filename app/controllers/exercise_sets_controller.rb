class ExerciseSetsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    
    def index
        exercise_sets = ExerciseSet.all
        render json: exercise_sets, include: :exercise
    end
    
    def show
        exercise_set = find_exercise_set
        ender json: exercise_set, include: :exercise
    end
    
    private

    def find_exercise_set
        ExerciseSet.find(params[:id])
    end
    
    def exercise_set_params
        params.permit(:set_number, :reps, :routine_id, :exercise_id)
    end

    def render_unprocessable_entity_response(exception)
        render json: {errors: exception.record.errors.full_messages}, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Exercise Set Not found" }, status: :not_found
    end
end
