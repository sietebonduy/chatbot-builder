Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  namespace :api do
    namespace :v1 do
      resources :hello, only: %i[index]
      resources :users, only: %i[index update]
      resources :routes , only: %i[index]
    end
  end
end
