# frozen_string_literal: true

class Api::V1::BotsController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    form = ::Api::V1::Bot::IndexForm.new(params)
    result = ::Bot::Index.call(current_user, form.params)

    if result.successful?
      render json: result.data
    else
      render_service_error(result)
    end
  end

  def show
    @bot = Bot.find(params[:id])

    if @bot.present?
      render json: @bot.as_json
    else
      render json: { message: 'Couldn\'t find record' }, status: :unauthorized
    end
  end

  def create
    form = ::Api::V1::Bot::CreateForm.new(params)
    result = ::Bot::Create.call(current_user, form.params)

    if result.successful?
      render json: result.data
    else
      render_service_error(result)
    end
  end

  def update
    form = ::Api::V1::Bot::UpdateForm.new(params)
    result = ::Bot::Update.call(current_user, form.params)

    if result.successful?
      render json: result.data
    else
      render_service_error(result)
    end
  end

  def destroy
    @bot = Bot.for_user(current_user).find(params[:id])

    if @bot.destroy
      head :no_content
    else
      render json: { message: 'Couldn\'t destroy record' }, status: :unauthorized
    end
  end
end