# frozen_string_literal: true

class Api::V1::Bot::CreateForm
  def initialize(params)
    @params = params
  end

  def params
    @params.permit(:provider, :token, :name, :default_response)
  end
end
