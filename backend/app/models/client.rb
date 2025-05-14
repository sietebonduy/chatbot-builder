# frozen_string_literal: true

class Client < ApplicationRecord
  belongs_to :bot
  has_many :chats
end
