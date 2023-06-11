Rails.application.routes.draw do
  resources :exercises, only: [:index, :show]
  resources :routines, only: [:index, :show]
  resources :workouts
  resources :exercise_sets
  resources :sweats
  resources :favorites, only: [:index, :create, :destroy]
  resources :users, only: [:create, :destroy]

  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
end
