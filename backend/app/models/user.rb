class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self
  devise :omniauthable, omniauth_providers: []

  has_many :socials, dependent: :destroy
  has_many :bots, dependent: :destroy

  def add_social(auth)
    social = socials.where(provider: auth.provider).first_or_create
    social.update!(uid: auth.uid, email: auth.info.email, extra: auth.is_a?(Hash) ? auth : {})
    social
  end
end