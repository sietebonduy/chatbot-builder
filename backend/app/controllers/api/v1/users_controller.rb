# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    users = User.all
    render json: UserSerializer.new(users).serializable_hash.to_json
  end

  def show
    form = ::Api::V1::User::ShowForm.new(params)
    result = ::User::Show.call(current_user, form.params)

    if result.successful?
      render json: UserSerializer.new(result.data).serializable_hash.to_json
    else
      render_service_error(result)
    end
  end

  def update
    form = ::Api::V1::User::UpdateForm.new(params)
    result = ::User::Update.call(current_user, form.params)

    if result.successful?
      render json: UserSerializer.new(result.data).serializable_hash.to_json
    else
      render_service_error(result)
    end
  end

  def me
    token = request.headers['Authorization']&.split(' ')&.last

    if current_user.auth_token_expired?(token)
      new_token = current_user.refresh_auth_token
      response.set_header('Authorization', "Bearer #{new_token}")
    end

    render json: UserSerializer.new(current_user).serializable_hash.to_json
  end
end
