# frozen_string_literal: true

class Api::V1::TelegramController < Api::V1::ApplicationController
  before_action :authenticate_user!
end