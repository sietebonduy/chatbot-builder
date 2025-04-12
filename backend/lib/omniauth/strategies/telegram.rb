require 'omniauth/strategies/oauth2'

class OmniAuth::Strategies::Telegram < OmniAuth::Strategies::OAuth2

end

OmniAuth.config.add_camelization 'telegram', 'Telegram'
