class LoginActivitySerializer
  include JSONAPI::Serializer

  set_type :login_activity
  attributes :ip, :city, :region, :country, :latitude, :longitude,
             :user_agent, :context, :identity, :strategy, :created_at,
             :device_type, :device_name, :os_name, :os_version,
             :browser_name, :browser_version
end
