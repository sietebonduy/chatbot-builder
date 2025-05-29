module SerializerHelper
  def self.avatar_url_for(object, host:)
    return nil unless object.avatar.attached?

    Rails.application.routes.url_helpers.rails_blob_url(object.avatar, host: host)
  end
end
