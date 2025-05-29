# frozen_string_literal: true

class Api::V1::Chat::IndexForm
  def initialize(params)
    @params = params
  end

  def params
    @params.permit(:user_id, :bot_id)
  end
end
