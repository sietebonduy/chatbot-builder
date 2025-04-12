# frozen_string_literal: true

class Api::V1::User::ShowForm
  def initialize(params)
    @params = params
  end

  def params
    @params.permit(:id)
  end
end
