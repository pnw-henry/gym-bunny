Rails.application.routes.draw do
  resources :exercises, only: [:index, :show, :update]
  resources :routines, only: [:index, :show, :update]
  resources :workouts
  resources :exercise_sets, only: [:index, :show]
  resources :sweats
  resources :favorites, only: [:create, :destroy]
  resources :users, only: [:create, :destroy, :update]

  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
end
