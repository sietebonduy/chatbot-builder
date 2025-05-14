# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :chat

  validates :content, presence: true
end