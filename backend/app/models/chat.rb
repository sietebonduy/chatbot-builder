# frozen_string_literal: true

class Chat < ApplicationRecord
  belongs_to :client
  belongs_to :bot
  has_many :messages, dependent: :destroy

  scope :for_bot, ->(bot) { where(bot_id: bot.id) }
end