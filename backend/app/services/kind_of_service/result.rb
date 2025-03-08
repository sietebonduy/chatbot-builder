# frozen_string_literal: true

class KindOfService::Result
  attr_reader :data, :errors

  def initialize(result)
    raise ArgumentError, "'result' should be an instance of Hash" unless result.instance_of?(Hash)
    raise ArgumentError, "'result' should have :data key" unless result.key?(:data)

    @data = result[:data]
    @errors = result.fetch(:errors, [])
  end

  def successful?
    @errors.blank?
  end

  def failed?
    !successful?
  end
end
