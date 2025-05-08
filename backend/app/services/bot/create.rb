# frozen_string_literal: true

class Bot::Create
  include KindOfService

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  private

  def perform
    bot = Bot.new(build_params)
    bot.user_id = @current_user.id
    bot.save!

    set_webhook
    bot.update(webhook_set_at: Time.current)

    success(bot)
  rescue => e
    error(e)
  end

  def build_params
    {
      user_id: @current_user.id,
      name: @params[:name],
      provider: @params[:provider],
      token: @params[:token],
      webhook_url: webhook_url,
    }
  end

  def set_webhook
    bot_provider.set_webhook(webhook_url)
  end

  def webhook_url
    "https://#{ENV['NGROK_HOST']}/webhooks/telegram/#{@current_user.id}/#{@params[:token]}"
  end

  def bot_provider
    @bot_provider ||= begin
                        case @params[:provider]
                        when 'telegram'
                          TelegramApi.new(@params[:token])
                        else
                          nil
                        end
                      end
  end
end