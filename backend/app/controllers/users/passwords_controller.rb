# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  before_action :authenticate_user!, only: [:update]

  def create
    user = User.find_by(email: params[:email])

    if user.present?
      user.send_reset_password_instructions

      render json: { message: I18n.t('devise.controllers.password_controller.instructions_sent')  }, status: :ok
    else
      render json: { error: I18n.t('devise.controllers.password_controller.email_not_found') }, status: :not_found
    end
  end

  def reset_password
    user = User.reset_password_by_token(reset_password_params)

    if user.errors.empty?
      render json: { message: I18n.t('devise.controllers.password_controller.reset_successfully') }, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if current_user.update_with_password(password_update_params)
      bypass_sign_in(current_user)

      render json: { message: I18n.t('devise.controllers.password_controller.update_successfully') }, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def reset_password_params
    params.permit(:reset_password_token, :password, :password_confirmation)
  end

  def password_update_params
    params.permit(:current_password, :password, :password_confirmation)
  end
end
