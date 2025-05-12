# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  before_action :authenticate_user!, only: [:update]

  def create
    user = User.find_by(email: params[:email])

    if user
      user.send_reset_password_instructions
      render json: { message: 'Reset password instructions sent to your email.' }, status: :ok
    else
      render json: { error: 'Email not found' }, status: :not_found
    end
  end

  def reset_password
    user = User.reset_password_by_token(reset_password_params)

    if user.errors.empty?
      render json: { message: 'Password has been reset successfully.' }, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if current_user.update_with_password(password_update_params)
      bypass_sign_in(current_user)

      render json: { message: 'Password updated successfully' }, status: :ok
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
