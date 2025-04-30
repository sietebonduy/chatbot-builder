# frozen_string_literal: true

class Api::V1::ScenariosController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    form = ::Api::V1::Scenario::IndexForm.new(params)
    result = ::Scenario::Index.call(current_user, form.params)

    if result.successful?
      render json: { message: 'Hello, World!' }
    else
      render_service_error(result)
    end
  end
end