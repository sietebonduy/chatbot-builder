module UrlHelper
  def blob_url(blob, host: nil)
    host ||= Rails.application.routes.default_url_options[:host]
    Rails.application.routes.url_helpers.rails_blob_url(blob, host: host)
  end
end
