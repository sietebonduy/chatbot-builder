# frozen_string_literal: true

require 'device_detector'

# set to true for geocoding (and add the geocoder gem to your Gemfile)
# we recommend configuring local geocoding as well
# see https://github.com/ankane/authtrail#geocoding
AuthTrail.geocode = true

# add or modify data
AuthTrail.transform_method = lambda do |data, request|
  user_agent = request.user_agent.to_s
  device = DeviceDetector.new(user_agent)

  data[:device_type]     = device.device_type     # "smartphone", "desktop"
  data[:device_name]     = device.device_name     # "iPhone", "Generic Smartphone"
  data[:os_name]         = device.os_name         # "iOS", "Android", "Windows"
  data[:os_version]      = device.os_full_version # "17.0", "10"
  data[:browser_name]    = device.name            # "Safari", "Chrome"
  data[:browser_version] = device.full_version    # "117.0.0.1"

  data
end

# exclude certain attempts from tracking
AuthTrail.exclude_method = lambda do |data|
  data[:context] != 'users/sessions#create'
end
