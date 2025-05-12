module SerializerHelper
  def self.avatar_url_for(user, host:)
    return nil unless user.avatar.attached?

    Rails.application.routes.url_helpers.rails_blob_url(user.avatar, host: host)
  end
end
