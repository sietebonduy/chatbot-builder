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

    user.assign_attributes(user_params)

    attach_avatar if @params[:avatar].present?

    user.save!

    success(user)
  rescue => e
    error(e.message)
  end

  def user_params
    permitted = {}

    permitted[:first_name] = @params[:first_name] if @params[:first_name].present?
    permitted[:last_name] = @params[:last_name] if @params[:last_name].present?
    permitted[:email] = @params[:email] if @params[:email].present?
    permitted[:locale] = @params[:locale] if @params[:locale].present?
    permitted[:admin] = @params[:admin].to_boolean if should_update_role?

    permitted
  end

  def attach_avatar
    user.avatar.attach(@params[:avatar])
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
