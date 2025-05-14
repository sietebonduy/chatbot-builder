# frozen_string_literal: true

class Api::V1::Bot::UpdateForm
  def initialize(params)
    @params = params
  end

  def params
    @params.permit(:id, :name, :token, :provider, :default_response)
  end
end
