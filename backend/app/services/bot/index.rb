# frozen_string_literal: true

class Bot::Index
  include KindOfService

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  private

  def perform
    bots = Bot.for_user(@current_user)
    bots = bots.without_flows if @params[:without_flows].to_boolean

    included = Bot.for_user(@current_user).where(id: @params[:include_bot_id])
    bots = bots.or(included)

    success(bots)
  rescue => e
    error(e)
  end
end