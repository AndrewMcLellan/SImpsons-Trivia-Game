Rails.application.routes.draw do
  root 'dashboards#index'
  devise_for :users

  resources :dashboards
  resources :game
  namespace :api do
    namespace :v1 do
      resources :characters
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
