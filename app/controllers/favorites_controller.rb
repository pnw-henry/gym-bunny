class FavoritesController < ApplicationController

    def index
        favorites = Favorite.all
        render json: favorites, include: :user
    end

    def show
        favorite = Favorite.find_by(id: params[:id])
        render json: favorite, include: :user
    end

    def create
        user = User.find_by(id: params[:user_id])
        favorite = user.favorites.create!(favorite_params)
        render json: favorite, include: :user, status: :created
    end

    def destroy
        favorite = Favorite.find_by(id: params[:id])
        favorite.destroy
        render json: favorite
    end

    private

    def favorite_params
        params.permit(:user_id, :routine_id)
    end
end
