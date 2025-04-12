# frozen_string_literal: true

class Webhooks::Telegram::Receive
  include KindOfService

  def initialize(params)
    @params = params
  end

  private

  def perform
    message = @params.dig("message", "text")
    chat_id = @params.dig("message", "chat", "id")

    api_client = TelegramApi.new(bot.token)
    api_client.send_message(chat_id, message)

    success
  rescue => e
    error(nil, [I18n.t('services.error')]e.message)
  end

  def bot
    @@bot ||= Bot.find_by!(provider: 'telegram', token: params[:bot_token])
  end
end