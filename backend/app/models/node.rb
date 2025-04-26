# frozen_string_literal: true

class Node < ApplicationRecord
  belongs_to :scenario

  has_many :outgoing_edges, class_name: 'Edge', foreign_key: :source, dependent: :destroy
  has_many :incoming_edges, class_name: 'Edge', foreign_key: :target, dependent: :destroy

  validates :type, presence: true
  validates :position_x, :position_y, presence: true
end
