# frozen_string_literal: true

class Webhooks::TelegramController < ApplicationController
  def receive
    form = ::Webhooks::Telegram::ReceiveForm.new(params)
    ::Webhooks::TelegramReceiveJob.perform_later(form.params)

    head :no_content
  end
end
