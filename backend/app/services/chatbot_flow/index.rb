# frozen_string_literal: true

class ChatbotFlow::Index
  include KindOfService

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  private

  def perform
    flows = ChatbotFlow.for_user(@current_user.id)

    success(flows)
  rescue => e
    error(e)
  end
end