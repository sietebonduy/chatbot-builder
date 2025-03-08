class BaseForm
  extend Memoist
  include ActiveModel::Model
  include ActiveModel::Validations
  include ActiveModel::Attributes
  include ActiveModel::Serializers::JSON

  attr_reader :raw_attributes

  def initialize(raw_attributes = {})
    @raw_attributes = raw_attributes.is_a?(ActionController::Parameters) ? raw_attributes.permit!.to_hash : raw_attributes
    attributes = @raw_attributes.select { |name, _value| self.class._default_attributes.keys.include?(name.to_s) }
    super(attributes)
  end
end
