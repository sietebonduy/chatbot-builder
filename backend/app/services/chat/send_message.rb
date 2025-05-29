# frozen_string_literal: true

class Chat::SendMessage
  include KindOfService

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  private

  def perform
    response = bot_provider.send_message(chat.client.chat_id, @params[:content])
    message = chat.messages.create(from_bot: true, content: @params[:content]) if response['ok'].to_boolean

    success(message)
  rescue => e
    error(e)
  end

  def chat
    @chat ||= Chat.find(@params[:chat_id])
  end

  def bot
    @bot ||= chat.bot
  end

  def bot_provider
    @bot_provider ||= begin
                        case bot.provider
                        when 'telegram'
                          TelegramApi.new(bot.token)
                        else
                          nil
                        end
                      end
  end
end