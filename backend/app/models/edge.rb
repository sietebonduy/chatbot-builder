# frozen_string_literal: true

class Edge < ApplicationRecord
  belongs_to :scenario

  belongs_to :source_node, class_name: 'Node', foreign_key: :source, optional: true
  belongs_to :target_node, class_name: 'Node', foreign_key: :target, optional: true
end
