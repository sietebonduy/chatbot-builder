# frozen_string_literal: true

class User::Update
  include KindOfService
  include ActionPolicy::Behaviour

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  private

  def perform
    authorize!(user, to: :update?, context: auth_context)

    user.update!(user_params)

    success(user)
  rescue => e
    error(e.message)
  end

  def user_params
    params = {}

    params.merge({ admin: @params[:admin].to_boolean }) if should_update_role?
    params
  end

  def should_update_role?
    @params[:admin].present? && @current_user.admin?
  end

  def user
    @user ||= User.find(@params[:id])
  end

  def auth_context
    { user: @current_user }
  end
end
