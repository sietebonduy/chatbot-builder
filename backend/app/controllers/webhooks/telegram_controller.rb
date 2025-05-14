# frozen_string_literal: true

class Webhooks::TelegramController < ApplicationController
  def receive
    form = ::Webhooks::Telegram::ReceiveForm.new(params)
    ::Webhooks::Telegram::Receive.call(form.params)

    head :no_content
  end
end
