require 'sidekiq/web'

Rails.application.routes.draw do
  authenticate :user, lambda { |user| user.admin? || Rails.env.development? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: '/letter_opener'
  end

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
      post 'verify_recaptcha', to: 'captchas#verify'

      resources :hello, only: %i[index]
      resources :users, only: %i[index show update] do
        collection do
          get :me
        end
      end
      resources :routes, only: %i[index]
      resources :chatbot_flows, only: %i[index show create update]
    end
  end
end
