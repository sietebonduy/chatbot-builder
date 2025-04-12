# frozen_string_literal: true

class Api::V1::HelloController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    render json: { message: 'Hello, World!' }
  end
end