# app/serializers/bot_serializer.rb
class BotSerializer
  include JSONAPI::Serializer

  set_type :bot

  attributes :id,
             :user_id,
             :provider,
             :token,
             :extra,
             :username,
             :bot_id,
             :name,
             :is_active,
             :webhook_url,
             :webhook_set_at,
             :last_used_at,
             :default_reply,
             :default_response,
             :message_count,
             :error_count,
             :avatar_url,
             :created_at,
             :updated_at
end
