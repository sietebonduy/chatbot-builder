# frozen_string_literal: true

class Api::V1::ChatbotFlow::CreateForm
  def initialize(params)
    @params = params
  end

  def params
    @params.permit(:user_id, :name, :description, flow_data: {})
  end
end
