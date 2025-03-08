# frozen_string_literal: true

module ResponseHelpers
  extend ActiveSupport::Concern

  private

  def render_service_error(result)
    render json: ::ErrorsSerializer.new(result).as_json, status: :unprocessable_entity
  end
end
