class SessionsController < ApplicationController

    def create
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id 
            render json: user, include: [:favorites, :workouts], status: :ok
        else
            render json: {errors: "Invalid username or password"}, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        render json: {message: "Logged out"}
    end
end
