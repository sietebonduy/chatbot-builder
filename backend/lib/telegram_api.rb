# frozen_string_literal: true

class TelegramApi
  BASE_URI = 'https://api.telegram.org/bot'

  def initialize(token)
    @token = token
  end

  def send_message(chat_id, text)
    body = { chat_id:, text: }
    response = HTTParty.post("#{base_url}/sendMessage", body:)
    JSON.parse(response.body)
  rescue Net::ReadTimeout
    { errors: [I18n.t('services.timeout_error')] }
  end

  def set_webhook(url)
    body = { url: }
    response = HTTParty.post("#{base_url}/setWebhook", body:)
    JSON.parse(response.body)
  rescue Net::ReadTimeout
    { errors: [I18n.t('services.timeout_error')] }
  end

  def get_updates
    response = HTTParty.get("#{base_url}/getUpdates")
    JSON.parse(response.body)
  rescue Net::ReadTimeout
    { errors: [I18n.t('services.timeout_error')] }
  end

  private

  def base_url
    @base_url ||= "#{BASE_URI}#{@token}"
  end
end