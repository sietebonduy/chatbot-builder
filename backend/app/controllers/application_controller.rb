# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionPolicy::Behaviour
  include Devise::Controllers::Helpers
  include ResponseHelpers
  include SetActiveStorageUrlOptions
  include HttpAcceptLanguage

  respond_to :json

  before_action :set_locale

  private

  def set_locale
    I18n.locale = current_user&.locale || extract_locale_from_accept_language_header
  end

  def extract_locale_from_accept_language_header
    http_accept_language.compatible_language_from(I18n.available_locales)
  end
end
