# frozen_string_literal: true

class Api::V1::CaptchasController < Api::V1::ApplicationController
  include SimpleCaptcha::ControllerHelpers

  def verify
    user_response = params[:recaptcha_response]

    if Recaptcha.verify(response: user_response)
      render json: { success: true }
    else
      render json: { success: false, message: "reCAPTCHA verification failed" }, status: :unprocessable_entity
    end
  end
end