# frozen_string_literal: true

module KindOfService
  extend ActiveSupport::Concern

  DEFAULT_ERROR_MESSAGE = 'Error happened.'

  included do
    extend Memoist
  end

  class_methods do
    def call(*args, **kwargs)
      instance = new(*args, **kwargs)
      instance.args = args
      instance.call
    end
  end

  attr_accessor :args

  def call
    @result = KindOfService::Result.new(perform)
    log_result(@result) if @result.failed?

    @result
  end

  def error(data = nil, messages = [DEFAULT_ERROR_MESSAGE])
    { data: data, errors: messages }
  end

  def success(data = nil)
    { data: data, errors: [] }
  end

  private

  def log_result(result)
    Rails.logger.error("Error happened in service #{self.class}. Arguments: #{args} Data: #{result.data} Errors: #{result.errors}")
  end
end
