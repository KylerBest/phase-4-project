Rails.application.routes.draw do
  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  resources :posts
  resources :likes, only: [:create]
  resources :users, only: [:update, :destroy]

end
