# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionPolicy::Behaviour
  include Devise::Controllers::Helpers
end
