# frozen_string_literal: true

class Api::V1::ChatbotFlow::IndexForm
  def initialize(params)
    @params = params
  end

  def params
    @params.permit(:user_id)
  end
end
