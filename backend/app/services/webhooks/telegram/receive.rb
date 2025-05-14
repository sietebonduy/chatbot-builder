# frozen_string_literal: true

class Webhooks::Telegram::Receive
  include KindOfService

  def initialize(params)
    @params = params
  end

  private

  def perform
    logger.info("Received params: #{@params}")
    chat_id = @params.dig('message', 'chat', 'id')
    text = @params.dig('message', 'text')
    return error(nil, ['No chat_id provided']) if chat_id.blank?

    client = Client.find_or_create_by!(chat_id: chat_id, bot_id: @params[:bot_id])
    chat = client.chats.where(client_id: client.id, bot_id: @params[:bot_id]).first
    chat = if chat.present?
             chat
            else
              Chat.create!(client_id: client.id, bot_id: @params[:bot_id])
            end

    chat.messages.create!(content: text)

    next_message = if text.downcase.strip == '/start' || text.downcase.strip == 'start'
                     start_message_from_flow
                   else
                     find_next_message(text, chat)
                   end
    logger.info("Next Message1: #{next_message}")
    next_message = bot.default_response.presence || 'No response found. Please try again!' if next_message.blank?
    logger.info("Next Message2: #{next_message}")

    # 4. Отправляем ответ
    api_client = TelegramApi.new(bot.token)
    api_client.send_message(chat_id, next_message)



    # 5. Сохраняем ответ
    chat.messages.create!(content: next_message, from_bot: true)

    success
  rescue => e
    Rails.logger.error("[Telegram::Receive] #{e.class}: #{e.message}")
    error(nil, [I18n.t('services.error')])
  end

  def start_message_from_flow
    logger.info("start_message_from_flow init")
    logger.info("Flow: #{flow.attributes.pretty_inspect}")

    return if flow.blank? || flow.flow_data.blank?

    nodes = flow.flow_data["nodes"]
    edges = flow.flow_data["edges"]
    return if nodes.blank? || edges.blank?

    # Найти node с type: "trigger"
    trigger_node = nodes.find do |n|
      n["type"] == "trigger" &&
        n.dig("data", "label").to_s.downcase.in?(["start", "старт"])
    end
    return unless trigger_node

    # Найти edge, где source — trigger
    edge_from_trigger = edges.find { |e| e["source"] == trigger_node["id"] }
    return unless edge_from_trigger

    # Найти node, на который указывает edge
    start_node = nodes.find { |n| n["id"] == edge_from_trigger["target"] }
    return unless start_node

    message = start_node.dig("data", "label")
    logger.info("Start message: #{message}")
    message
  end


  def find_next_message(user_text, chat)
    logger.info("find_next_message with {text: #{text}}, chat_id: #{chat.id}")
    return if flow.blank? || flow.flow_data.blank?

    nodes = flow.flow_data["nodes"]
    edges = flow.flow_data["edges"]
    return if nodes.blank?

    last_bot_message = last_bot_message_from_chat(chat)
    current_node = find_node_by_label(nodes, last_bot_message) || start_node(nodes, edges)
    return if current_node.blank?

    next_node_id = edges.find { |e| e["source"] == current_node["id"] }&.dig("target")
    next_node = nodes.find { |n| n["id"] == next_node_id }

    next_node&.dig("data", "label")
  end

  def last_bot_message_from_chat(chat)
    chat.messages.where(from_client: false).order(created_at: :desc).first&.content
  end

  def find_node_by_label(nodes, label)
    nodes.find { |n| n.dig("data", "label") == label }
  end

  def start_node(nodes, edges)
    incoming = edges.map { |e| e["target"] }
    nodes.find { |n| n["type"] == "message" && !incoming.include?(n["id"]) }
  end

  def flow
    @flow ||= bot.chatbot_flow
  end

  def bot
    @bot ||= Bot.find_by!(id: @params[:bot_id], token: @params[:bot_token], provider: 'telegram')
  end

  def log_with_tags(&block)
    logger.tagged("bot_id:#{@params[:bot_id]}", "chat_id:#{@params.dig('message', 'chat', 'id')}") do
      yield logger
    end
  end

  def logger
    @logger ||= ActiveSupport::Logger.new(Rails.root.join('log', 'telegram.log'))
  end
end
