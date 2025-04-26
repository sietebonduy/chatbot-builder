# frozen_string_literal: true

class Scenario < ApplicationRecord
  has_many :nodes, dependent: :destroy
  has_many :edges, dependent: :destroy

  validates :name, presence: true
end
