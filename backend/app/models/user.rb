# frozen_string_literal: true

class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  enum :locale, { ru: 0, en: 1 }

  has_one_attached :avatar

  devise :database_authenticatable, :registerable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self
  devise :omniauthable, omniauth_providers: []

  has_many :socials, dependent: :destroy
  has_many :bots, dependent: :destroy
  has_many :chatbot_flows, dependent: :destroy
  has_many :login_activities, as: :user

  def auth_token_expired?(token)
    jwt_secret_key = ENV['JWT_SECRET_KEY']
    decoded = JWT.decode(token, jwt_secret_key, true, algorithm: 'HS256').first
    Time.at(decoded['exp']) < Time.current
  rescue JWT::ExpiredSignature, JWT::DecodeError
    true
  end

  def refresh_auth_token
    jwt_secret_key = ENV['JWT_SECRET_KEY']
    JWT.encode({ sub: id, jti: jti, exp: 1.week.from_now.to_i }, jwt_secret_key, 'HS256')
  end

  def add_social(auth)
    social = socials.where(provider: auth.provider).first_or_create
    social.update!(uid: auth.uid, email: auth.info.email, extra: auth.is_a?(Hash) ? auth : {})
    social
  end

  def full_name
    "#{first_name} #{last_name}"
  end
end