class ChatbotFlowSerializer
  include JSONAPI::Serializer

  set_type :chatbot_flow

  attributes :id,
             :name,
             :slug,
             :description,
             :flow_data,
             :published,
             :published_at,
             :created_at,
             :updated_at

  belongs_to :user, serializer: UserSerializer
  belongs_to :bot,  serializer: BotSerializer, if: ->(obj, _params) { obj.bot_id.present? }
end
