# frozen_string_literal: true

module SetActiveStorageUrlOptions
  extend ActiveSupport::Concern

  included do
    before_action :set_active_storage_url_options
  end

  private

  def set_active_storage_url_options
    ActiveStorage::Current.url_options ||= {
      protocol: request.protocol.delete('://'),
      host: request.host,
      port: request.port == 80 ? nil : request.port
    }.compact
  end
end
