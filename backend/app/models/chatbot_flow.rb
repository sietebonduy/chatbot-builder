# frozen_string_literal: true

class ChatbotFlow < ApplicationRecord
  include Sluggable

  belongs_to :user

  friendly_id :slug_candidates, use: [:slugged, :history, :scoped], scope: :user

  validates :name, presence: true
  validates :slug, uniqueness: { scope: :user_id }
end