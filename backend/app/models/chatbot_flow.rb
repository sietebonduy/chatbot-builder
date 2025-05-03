# frozen_string_literal: true

class ChatbotFlow < ApplicationRecord
  include Sluggable

  belongs_to :user

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
end