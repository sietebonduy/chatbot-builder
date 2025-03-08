# frozen_string_literal: true

class Api::V1::RoutesController < Api::V1::ApplicationController
  def index
    result = Routes::Index.call

    if result.successful?
      render json: result.data
    else
      render_service_error(result)
    end
  end
end
