# frozen_string_literal: true

class Bot < ApplicationRecord
  belongs_to :user

  has_one :chatbot_flow, foreign_key: :bot_id, dependent: :nullify
  has_many :chats

  has_one_attached :avatar

  scope :for_user, ->(current_user) { where(user_id: current_user.id) }

  scope :without_flows, -> {
    left_outer_joins(:chatbot_flow)
      .where(chatbot_flows: { id: nil })
  }
end
