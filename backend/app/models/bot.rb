# frozen_string_literal: true

class Bot < ApplicationRecord
  belongs_to :user
  has_one :chatbot_flows

  has_one_attached :avatar

  scope :for_user, ->(current_user) { where(user_id: current_user.id) }
end
