# frozen_string_literal: true

module ResponseHelpers
  extend ActiveSupport::Concern

  private

  def render_service_error(result)
    render json: { errors: result.errors }, status: :unprocessable_entity
  end
end
