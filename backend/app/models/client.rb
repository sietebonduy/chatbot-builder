# frozen_string_literal: true

class Client < ApplicationRecord
  has_one_attached :avatar

  belongs_to :bot
  has_many :chats
end
