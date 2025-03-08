# frozen_string_literal: true

class Api::V1::ApplicationController < ApplicationController
  include ResponseHelpers

  respond_to :json
end
