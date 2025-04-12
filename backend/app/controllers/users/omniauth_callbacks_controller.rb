# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def telegram
    logger.info('==============Telegram:==============')
    auth_with('Telegram')
  end

  def failure
    redirect_to root_path
  end

  private

  def auth_with(provider_name)
    logger.info("==============#{provider_name} AUTH==============")
    auth = request.env['omniauth.auth']

    logger.info("Auth data: #{auth.inspect}")

    if current_user.present?
      logger.info('Current user is present.')
      current_user.add_social(auth)
    else
      logger.info('User not found!')
      flash[:error] = 'User not found.'
    end

    redirect_to root_path
  end

  def logger
    @@logger ||= Logger.new(Rails.root.join('log', 'omniauth_callback.log'))
  end
end
