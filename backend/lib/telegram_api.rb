# frozen_string_literal: true

class TelegramApi
  BASE_URI = 'https://api.telegram.org/bot'

  def initialize(token)
    @token = token
  end

  def send_message(chat_id, text, reply_markup: nil)
    payload = {
      chat_id: chat_id,
      text:    text,
      parse_mode: 'Markdown'
    }
    payload[:reply_markup] = reply_markup if reply_markup.present?

    response = HTTParty.post(
      "#{base_url}/sendMessage",
      headers: { 'Content-Type' => 'application/json' },
      body: payload.to_json
    )
    JSON.parse(response.body)
  rescue Net::ReadTimeout
    { errors: [I18n.t('services.timeout_error')] }
  end

  def answer_callback_query(callback_query_id)
    payload = { callback_query_id: callback_query_id }
    HTTParty.post(
      "#{base_url}/answerCallbackQuery",
      headers: { 'Content-Type' => 'application/json' },
      body: payload.to_json
    )
  rescue Net::ReadTimeout
    { 'ok' => false, 'description' => I18n.t('services.timeout_error') }
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

  def get_me
    response = HTTParty.get("#{base_url}/getMe?token=#{@token}")
    JSON.parse(response.body)
  rescue Net::ReadTimeout
    { errors: [I18n.t('services.timeout_error')] }
  end

  def get_webhook_info
    response = HTTParty.get("#{base_url}/getWebhookInfo")
    JSON.parse(response.body)
  rescue Net::ReadTimeout
    { errors: [I18n.t('services.timeout_error')] }
  end

  private

  def base_url
    @base_url ||= "#{BASE_URI}#{@token}"
  end
end