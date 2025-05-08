# app/helpers/webhook_helper.rb
module WebhookHelper
  def generate_webhook_url(host, user_id, provider, bot_token)
    "https://#{host}/webhooks/#{provider}/#{user_id}/#{bot_token}"
  end
end
