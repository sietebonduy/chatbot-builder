# frozen_string_literal: true

class Api::V1::Bot::IndexForm
  def initialize(params)
    @params = params
  end

  def params
    @params.permit(:user_id, :provider)
  end
end
