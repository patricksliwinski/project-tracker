Rails.application.routes.draw do
  root "projects#index"
  devise_for :users
  resources :projects do
    resources :sessions, only: [:create]
    resources :milestones, only: [:create]
  end
end
