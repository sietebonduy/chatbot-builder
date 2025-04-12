Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }

  namespace :webhooks do
    post 'telegram/:bot_token', to: 'telegram#receive'
  end

  namespace :api do
    namespace :v1 do
      resources :hello, only: %i[index]
      resources :users, only: %i[index show update]
      resources :routes , only: %i[index]
    end
  end
end
