# frozen_string_literal: true

class Bot < ApplicationRecord
  belongs_to :user

  has_one :chatbot_flow, foreign_key: :bot_id, dependent: :nullify
  has_many :chats

  has_one_attached :avatar

  scope :for_user, ->(user_id) { where(user_id: user_id) }
  scope :without_flows, -> { left_outer_joins(:chatbot_flow).where(chatbot_flows: { id: nil }) }
end
