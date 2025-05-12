# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  before_action :authenticate_user!, only: [:update]

  def update
    if current_user.update_with_password(password_update_params)
      bypass_sign_in(current_user)

      render json: { message: 'Password updated successfully' }, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def password_update_params
    params.permit(:current_password, :password, :password_confirmation)
  end
end
