# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # include RackSessionFix
  include SetActiveStorageUrlOptions

  respond_to :json

  private

  def respond_with(resource, _opts = {})
    session[:user_id] = resource.id

    render json: UserSerializer.new(resource, { params: { host: request.base_url }}).serializable_hash
  end

  def respond_to_on_destroy
    if current_user
      reset_session
      render json: { message: I18n.t('devise.controllers.sessions_controller.logged_out_successfully') }, status: :ok
    else
      render json: { message: I18n.t('devise.controllers.sessions_controller.could_not_find_an_active_session') }, status: :unauthorized
    end
  end
end
