# frozen_string_literal: true

module ResponseHelpers
  extend ActiveSupport::Concern

  private

  def render_service_error(result = nil)
    errors = result.present? && result.errors.present? ? result.errors : [I18n.t('services.error')]

    render json: { errors: errors }, status: :unprocessable_entity
  end
end
