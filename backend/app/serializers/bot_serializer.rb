# app/serializers/bot_serializer.rb
class BotSerializer
  include JSONAPI::Serializer

  set_type :bot

  attributes :id,
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

  belongs_to :user,
             serializer: UserSerializer,
             if: ->(object, _params) { object.user_id.present? }

  has_many :chatbot_flows,
           serializer: ChatbotFlowSerializer,
           if: ->(object, _params) { object.association(:chatbot_flows).loaded? }
end
