class ExerciseSetsController < ApplicationController
    
        def index
            exercise_sets = ExerciseSet.all
            render json: exercise_sets, include: :exercise
        end
    
        def show
            exercise_set = ExerciseSet.find_by(id: params[:id])
            render json: exercise_set, include: :exercise
        end
    
        def create
            exercise_set = ExerciseSet.create(exercise_set_params)
            render json: exercise_set, include: :exercise
        end
    
        def update
            exercise_set = ExerciseSet.find_by(id: params[:id])
            exercise_set.update(exercise_set_params)
            render json: exercise_set
        end
    
        def destroy
            exercise_set = ExerciseSet.find_by(id: params[:id])
            exercise_set.destroy
            render json: exercise_set
        end
    
        private
    
        def exercise_set_params
            params.permit(:set_number, :reps, :routine_id, :exercise_id)
        end
end
