# frozen_string_literal: true

class ChatbotFlow::Create
  include KindOfService

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  private

  def perform
    flow = @current_user.chatbot_flows.create!(@params)

    success(flow)
  rescue => e
    error(e)
  end
end