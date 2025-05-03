# frozen_string_literal: true

class ChatbotFlow::Update
  include KindOfService

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  private

  def perform
    flow = ChatbotFlow.update(@params)

    success(flow)
  rescue => e
    error(e)
  end
end