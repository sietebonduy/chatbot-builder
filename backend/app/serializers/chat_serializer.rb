# app/serializers/bot_serializer.rb
class ChatSerializer
  include JSONAPI::Serializer

  set_type :chat

  attributes :id, :created_at, :updated_at

  belongs_to :client
  belongs_to :bot
  has_many :messages do |chat|
    chat.messages.order(created_at: :asc)
  end
end
