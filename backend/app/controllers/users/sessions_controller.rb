# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # include RackSessionFix
  include SetActiveStorageUrlOptions

  respond_to :json

  private

  def respond_with(resource, _opts = {})
    session[:user_id] = resource.id

    render json: UserSerializer.new(resource).serializable_hash.to_json
  end

  def respond_to_on_destroy
    if current_user
      reset_session

      render json: { message: 'Logged out successfully' }, status: :ok
    else
      render json: { message: 'Couldn\'t find an active session.' }, status: :unauthorized
    end
  end
end
