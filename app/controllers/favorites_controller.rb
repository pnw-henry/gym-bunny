class FavoritesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    before_action :authorize

    def create
        user = find_user
        favorite = user.favorites.create!(favorite_params)
        render json: favorite, include: :user, status: :created
    end

    def destroy
        user = find_user
        favorite = find_favorite
        if (user.id != favorite.user_id)
            return render json: {error: "You are not authorized to delete this favorite"}, status: :unauthorized
        else
            favorite.destroy
            head :no_content
        end
    end

    private

    def find_favorite
        Favorite.find(params[:id])
    end

    def find_user
        User.find(session[:user_id])
    end

    def favorite_params
        params.permit(:user_id, :routine_id)
    end

    def authorize
        return render json: {error: "Please login first"}, status: :unauthorized unless session.include? :user_id
    end

    def render_unprocessable_entity_response(exception)
        render json: {errors: exception.record.errors.full_messages}, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Favorite Not Found" }, status: :not_found
    end
end
