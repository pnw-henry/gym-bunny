class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    before_action :authorize, only: [:show, :update]

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, include: [:favorites, :workouts, :sweats], status: :created
    end

    def show
        user = User.find_by(id: session[:user_id])
        render json: user, include: [:favorites, :workouts, :sweats], status: :ok
    end

    def update
        user = User.find_by(id: session[:user_id])
        user.avatar.attach(params[:avatar])
        user.save(validate: false)
        render json: user, include: [:favorites, :workouts, :sweats], status: :ok
    end


    private

    def render_unprocessable_entity_response(exception)
        render json: {errors: exception.record.errors.full_messages}, status: :unprocessable_entity
    end

    def authorize
        return render json: {error: "Please login first to view your profile"}, status: :unauthorized unless session.include? :user_id
    end
    
    def render_not_found_response
        render json: {error: "User not found"}, status: :not_found
    end

    def user_params
        params.permit(:name, :email, :email_confirmation, :username, :password, :password_confirmation, :avatar )
    end
end
