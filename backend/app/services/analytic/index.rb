# frozen_string_literal: true

class Analytic::Index
  include KindOfService

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  private

  def perform
    bots = Bot.for_user(@current_user)
    total_chats = 0
    total_messages_from_bots = 0
    total_messages_from_clients = 0
    scheduled_messages = 0

    bots.find_each do |bot|
      total_chats += bot.chats.size
      bot.chats.find_each do |chat|
        total_messages_from_bots += chat.messages.where(from_bot: true).size
        total_messages_from_clients += chat.messages.where(from_bot: false).size
      end
    end

    result = {
      total_chats: total_chats,
      total_messages_from_bots: total_messages_from_bots,
      total_messages_from_clients: total_messages_from_clients,
      scheduled_messages: scheduled_messages
    }

    success(result)
  rescue => e
    error(e)
  end
end