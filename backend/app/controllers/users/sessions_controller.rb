# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include RackSessionFix

  respond_to :json

  private

  def respond_with(resource, _opts = {})
    session[:user_id] = resource.id

    render json: { message: 'Logged in sucessfully.', data: resource }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      reset_session

      render json: { message: 'logged out successfully' }, status: :ok
    else
      render json: { message: 'Couldn\'t find an active session.' }, status: :unauthorized
    end
  end
end
