# frozen_string_literal: true

class Chat::Index
  include KindOfService

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  private

  def perform
    chats = Chat.for_bot(bot)

    success(chats)
  rescue => e
    error(e)
  end

  def bot
    @bot ||= Bot.find(@params[:bot_id])
  end
end