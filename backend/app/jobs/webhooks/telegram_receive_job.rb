class Webhooks::TelegramReceiveJob < ApplicationJob
  queue_as :default

  def perform(params)
    ::Webhooks::Telegram::Receive.call(params)
  end
end
