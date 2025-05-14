# frozen_string_literal: true

class Bot::Update
  include KindOfService

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  private

  def perform
    bot = Bot.find(@params[:id])
    bot.update!(@params)

    success(bot)
  rescue => e
    error(e)
  end
end
