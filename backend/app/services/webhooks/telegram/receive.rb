# frozen_string_literal: true

class Webhooks::Telegram::Receive
  include KindOfService

  def initialize(params)
    @params = params
  end

  private

  def perform
    logger.info("Received params: #{@params}")

    if @params[:callback_query].present?
      cq         = @params[:callback_query]
      chat_id    = cq.dig(:message, :chat, :id)
      user_input = { button_id: cq[:data] }

      api_client.answer_callback_query(cq[:id])
    elsif @params[:message].present?
      chat_id    = @params.dig(:message, :chat, :id)
      user_input = @params.dig(:message, :text) || ''
    else
      return error(nil, ['No message or callback_query'])
    end

    return error(nil, ['No chat_id']) if chat_id.blank?

    client = Client.find_or_create_by!(chat_id: chat_id, bot_id: @params[:bot_id])
    chat   = client.chats.find_or_create_by!(client_id: client.id, bot_id: @params[:bot_id])
    chat.messages.create!(content: user_input) unless user_input.is_a?(Hash)

    next_node = if !user_input.is_a?(Hash) && %w[/start start].include?(user_input.downcase.strip)
                  find_start_node
                else
                  find_next_node(user_input, chat)
                end

    if next_node.present?
      reply_text = next_node.dig('data','label')
      opts       = next_node.dig('data','options') || []

      if opts.any?
        keyboard = opts.map { |o| [{ text: o['label'], callback_data: o['id'] }] }
        reply_markup = { inline_keyboard: keyboard }
      end
    else
      reply_text   = bot.default_response.presence || 'No response found'
      reply_markup = nil
    end

    api_client.send_message(chat_id, reply_text, reply_markup: reply_markup)
    chat.messages.create!(content: reply_text, from_bot: true)

    success
  rescue => e
    logger.error("[Telegram::Receive] #{e.class}: #{e.message}\n#{e.backtrace.join("\n")}")
    error(nil, [I18n.t('services.error')])
  end


  def find_start_node
    nodes = flow.flow_data['nodes'] || []
    edges = flow.flow_data['edges'] || []

    trigger = nodes.detect { |n| n['type'] == 'trigger' }
    return unless trigger

    first_edge = edges.detect { |e| e['source'] == trigger['id'] }
    nodes.detect { |n| n['id'] == first_edge['target'] } if first_edge
  end

  def find_next_node(user_text, chat)
    nodes = flow.flow_data['nodes'] || []
    edges = flow.flow_data['edges'] || []

    if user_text.is_a?(Hash) && user_text[:button_id].present?
      edge = edges.find { |e| e['source_handle'] == user_text[:button_id] }
      return nodes.find { |n| n['id'] == edge&.dig('target') } if edge
    end

    last_msg_from_bot = chat.messages.where(from_bot: true).order(:created_at).last&.content
    current = nodes.find { |n| n.dig('data', 'label') == last_msg_from_bot } || find_start_node
    return unless current

    if current.dig('data','options').present?
      opts = current.dig('data','options')

      chosen = opts.find { |o| o['label'].to_s.strip.casecmp?(user_text.to_s.strip) }
      edge = edges.find { |e| e['source'] == current['id'] && e['source_handle']==chosen&.fetch('id',nil) }
    else
      edge = edges.find { |e| e['source'] == current['id'] }
    end

    nodes.find { |n| n['id'] == edge&.dig('target') } if edge
  end

  def flow
    @flow ||= bot.chatbot_flow
  end

  def bot
    @bot ||= Bot.find_by!(id: @params[:bot_id], token: @params[:bot_token], provider: 'telegram')
  end

  def api_client
    @api_client ||= TelegramApi.new(bot.token)
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
