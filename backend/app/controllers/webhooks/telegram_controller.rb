# frozen_string_literal: true

class Webhooks::TelegramController < ApplicationController
  def receive
    form = ::Webhooks::Telegram::ReceiveForm.new(params)
    result = ::Webhooks::Telegram::Receive.call(form.params)

    if result.successful?
      head :no_content
    else
      render_service_error(result)
    end
  end
end
