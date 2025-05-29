# frozen_string_literal: true

class Api::V1::ChatsController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    form = ::Api::V1::Chat::IndexForm.new(params)
    result = ::Chat::Index.call(current_user, form.params)

    if result.successful?
      render json: ChatSerializer.new(result.data, include: [:client, :bot, :messages]).serializable_hash
    else
      render_service_error(result)
    end
  end

  def show
    @chat = Chat.includes(:client, :bot, :messages).find(params[:id])

    if @chat.present?
      render json: ChatSerializer.new(@chat, include: [:client, :bot, :messages]).serializable_hash
    else
      render_service_error
    end
  end

  def send_message
    form = ::Api::V1::Chat::SendMessageForm.new(params)
    result = ::Chat::SendMessage.call(current_user, form.params)

    if result.successful?
      render json: MessageSerializer.new(result.data).serializable_hash
    else
      render_service_error(result)
    end
  end
end