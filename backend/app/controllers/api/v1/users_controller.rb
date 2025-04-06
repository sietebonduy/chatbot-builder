# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    render json: User.all.to_json
  end

  def update
    form = ::Api::V1::User::UpdateForm.new(params)
    result = ::User::Update.call(current_user, form.params)

    if result.successful?
      render json: result.data
    else
      render_service_error(result)
    end
  end
end