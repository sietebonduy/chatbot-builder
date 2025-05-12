class UserSerializer
  include JSONAPI::Serializer

  set_type :user
  attributes :id, :first_name, :last_name, :full_name, :email, :admin, :locale, :created_at, :updated_at

  attribute :avatar_url do |object, params|
    SerializerHelper.avatar_url_for(object, host: params[:host])
  end
end
