# app/serializers/bot_serializer.rb
class ClientSerializer
  include JSONAPI::Serializer

  set_type :client

  attributes :id, :chat_id, :first_name, :last_name, :username, :bot_id

  attribute :avatar_url do |object, params|
    SerializerHelper.avatar_url_for(object, host: params[:host])
  end
end
