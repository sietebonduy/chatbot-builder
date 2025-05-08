# frozen_string_literal: true

class Webhooks::Telegram::Receive
  include KindOfService

  def initialize(params)
    @params = params
  end

  private

  def perform
    chat_id = @params.dig("message", "chat", "id")
    return error(nil, ['No chat_id provided']) if chat_id.blank?

    first_message = first_message_from_flow
    return error(nil, ['Flow is empty or invalid']) if first_message.blank?

    api_client = TelegramApi.new(bot.token)
    api_client.send_message(chat_id, first_message)

    success
  rescue StandardError => e
    Rails.logger.error("[Telegram::Receive] #{e.class}: #{e.message}")
    error(nil, [I18n.t('services.error')])
  end

  def first_message_from_flow
    return if flow.blank? || flow.flow_data.blank?

    nodes = flow.flow_data["nodes"]
    edges = flow.flow_data["edges"]
    return if nodes.blank?

    incoming_targets = edges.map { |e| e["target"] }
    start_node = nodes.find do |node|
      node["type"] == "message" && !incoming_targets.include?(node["id"])
    end

    start_node&.dig("data", "label")
  end

  def flow
    @flow ||= bot.chatbot_flows.last
  end

  def bot
    @bot ||= Bot.find_by!(provider: 'telegram', token: @params[:bot_token])
  end
end