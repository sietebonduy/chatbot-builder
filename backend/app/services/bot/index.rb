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

    success(bots)
  rescue => e
    error(e)
  end
end