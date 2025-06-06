require 'sidekiq/web'

Sidekiq::Web.use Rack::Auth::Basic do |username, password|
  ActiveSupport::SecurityUtils.secure_compare(username, ENV.fetch('SIDEKIQ_USERNAME', 'admin')) &
    ActiveSupport::SecurityUtils.secure_compare(password, ENV.fetch('SIDEKIQ_PASSWORD', 'secret'))
end

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  mount ActiveStorage::Engine => '/rails/active_storage'

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: '/letter_opener'
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    omniauth_callbacks: 'users/omniauth_callbacks',
    passwords: 'users/passwords'
  }

  devise_scope :user do
    patch '/users/password', to: 'users/passwords#update'
    put 'users/reset_password', to: 'users/passwords#reset_password'
  end


  namespace :webhooks do
    post 'telegram/:bot_id/:bot_token', to: 'telegram#receive'
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
      resources :chatbot_flows, only: %i[index show create update destroy]
      resources :bots, only: %i[index show create update destroy] do
        collection do
          get :check_status
        end
      end
      resources :login_activities, only: %i[index]
      resources :analytics, only: %i[index] do
        collection do
          get :messages_over_time
          get :chats_over_time
          get :messages_by_hour
        end
      end
      resources :chats, only: %i[index show] do
        member do
          post :send_message
        end
      end
    end
  end
end
