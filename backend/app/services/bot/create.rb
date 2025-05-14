# frozen_string_literal: true

class Bot::Create
  include KindOfService

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  private

  def perform
    bot = Bot.new(build_params)
    bot.user_id = @current_user.id
    bot.save!

    success(bot)
  rescue => e
    error(e)
  end

  def build_params
    {
      user_id: @current_user.id,
      name: @params[:name],
      provider: @params[:provider],
      token: @params[:token],
      default_response: @params[:default_response],
    }
  end
end