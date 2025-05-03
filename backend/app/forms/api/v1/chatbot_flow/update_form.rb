# frozen_string_literal: true

class Api::V1::ChatbotFlow::UpdateForm
  def initialize(params)
    @params = params
  end

  def params
    @params.permit(:id, :name, :description, :published, flow_data: {})
  end
end
