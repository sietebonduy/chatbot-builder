# frozen_string_literal: true

Rails.application.reloader.to_prepare do
  ActiveStorage::Current.url_options ||= {
    protocol: Rails.application.config.force_ssl ? 'https' : 'http',
    host: Rails.application.config.action_mailer.default_url_options[:host],
    port: Rails.application.config.action_mailer.default_url_options[:port]
  }.compact
end
