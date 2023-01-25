Rails.application.routes.draw do
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  patch "/update_profile", to: "users#update"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  resources :posts, only: [:index, :create, :destroy]
  resources :likes, only: [:create]
  resources :users, only: [:index, :destroy]

end
