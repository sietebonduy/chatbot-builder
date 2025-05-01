module Sluggable
  extend ActiveSupport::Concern

  included do
    extend FriendlyId
    friendly_id :slug_candidates, use: [:slugged, :history]

    validates :slug, uniqueness: true
    before_validation :set_default_slug, if: :should_set_default_slug?
  end

  def slug_candidates
    [:name, [:name, :id]]
  end

  def should_generate_new_friendly_id?
    name_changed? || super
  end

  def to_param
    slug.presence || super
  end

  private

  def should_set_default_slug?
    slug.blank? && name.present?
  end

  def set_default_slug
    self.slug = normalize_friendly_id(name)
  end
end
