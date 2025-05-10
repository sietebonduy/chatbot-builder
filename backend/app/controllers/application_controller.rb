# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionPolicy::Behaviour
  include Devise::Controllers::Helpers
  include ResponseHelpers
  include SetActiveStorageUrlOptions

  respond_to :json
end
