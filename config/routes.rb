Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root "home#index"

  get "/projects", to: "projects#index"
  resources :projects do
    resources :sessions
    resources :milestones
  end

  get "/tasks", to: "tasks#index"

  devise_for :users, controllers: {
    :sessions => "users/sessions",
    :registrations => "users/registrations",
    :passwords => "users/passwords" }

end