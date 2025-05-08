# frozen_string_literal: true

class ChatbotFlow < ApplicationRecord
  include Sluggable

  belongs_to :user
  belongs_to :bot, optional: true

  scope :for_user, ->(current_user) { where(user_id: current_user.id) }

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
end