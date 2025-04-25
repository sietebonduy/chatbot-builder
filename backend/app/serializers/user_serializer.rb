class UserSerializer
  include JSONAPI::Serializer

  set_type :user
  attributes :email, :admin, :created_at, :updated_at
end
