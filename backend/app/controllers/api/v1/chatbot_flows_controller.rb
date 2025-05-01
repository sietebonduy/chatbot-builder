# frozen_string_literal: true

class Api::V1::ChatbotFlowsController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    form = ::Api::V1::ChatbotFlow::IndexForm.new(params)
    result = ::ChatbotFlow::Index.call(current_user, form.params)

    if result.successful?
      render json: result.data
    else
      render_service_error(result)
    end
  end

  def create
    form = ::Api::V1::ChatbotFlow::CreateForm.new(params)
    result = ::ChatbotFlow::Create.call(current_user, form.params)

    if result.successful?
      render json: result.data
    else
      render_service_error(result)
    end
  end
end