class MessageSerializer
  include JSONAPI::Serializer

  set_type :message

  attributes :id, :chat_id, :content, :from_bot, :created_at
end
