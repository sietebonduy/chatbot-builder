# frozen_string_literal: true

class Api::V1::Chat::SendMessageForm
  def initialize(params)
    @params = params
  end

  def params
    @params.permit(:content, :chat_id)
  end
end
