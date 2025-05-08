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

    update_params = build_params(bot)
    bot.update(update_params)

    success(bot)
  rescue => e
    error(e)
  end

  def build_params(bot)
    {}.tap do |params|
    end
  end
end