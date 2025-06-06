# frozen_string_literal: true

class Api::V1::ChatbotFlowsController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    form = ::Api::V1::ChatbotFlow::IndexForm.new(params)
    result = ::ChatbotFlow::Index.call(current_user, form.params)

    if result.successful?
      render json: ChatbotFlowSerializer.new(result.data).serializable_hash
    else
      render_service_error(result)
    end
  end

  def show
    @chatbot_flow = ChatbotFlow.friendly.find(params[:id])

    if @chatbot_flow.present?
      render json: ChatbotFlowSerializer.new(@chatbot_flow).serializable_hash
    else
      render_service_error
    end
  end

  def create
    form = ::Api::V1::ChatbotFlow::CreateForm.new(params)
    result = ::ChatbotFlow::Create.call(current_user, form.params)

    if result.successful?
      render json: ChatbotFlowSerializer.new(result.data).serializable_hash
    else
      render_service_error(result)
    end
  end

  def update
    form = ::Api::V1::ChatbotFlow::UpdateForm.new(params)
    result = ::ChatbotFlow::Update.call(current_user, form.params)

    if result.successful?
      render json: ChatbotFlowSerializer.new(result.data).serializable_hash
    else
      render_service_error(result)
    end
  end

  def destroy
    @chatbot_flow = ChatbotFlow.for_user(current_user).find(params[:id])

    if @chatbot_flow.destroy
      head :no_content
    else
      render_service_error
    end
  end
end