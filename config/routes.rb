Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root "home#index"

  get "/projects", to: "projects#index"
  resources :projects do
    resources :sessions
  end

  get "/tasks", to: "tasks#index"

end