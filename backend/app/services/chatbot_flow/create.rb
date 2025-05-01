# frozen_string_literal: true

class ChatbotFlow::Create
  include KindOfService

  def initialize(current_user)
    @current_user = current_user
  end

  private

  def perform

    success()
  rescue => e
    error(e)
  end
end