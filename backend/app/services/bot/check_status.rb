# frozen_string_literal: true

class Bot::CheckStatus
  include KindOfService

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  private

  def perform
    bot = Bot.for_user(@current_user).find(@params[:id])
    return error(nil, [I18n.t('services.error')]) if bot.blank? || bot.token.blank?

    info = get_bot_info(bot)
    return error(nil, [I18n.t('services.error')]) if info[:username].blank?

    success(bot)
  rescue => e
    error(e)
  end


  def get_bot_info(bot)
    provider = bot_provider(bot)
    bot_info = provider.get_me
    webhook_info = provider.get_webhook_info

    result = {}

    if bot_info.present? && bot_info['ok'].to_boolean
      result.merge!(username: bot_info.dig('result', 'username'),
                    first_name: bot_info.dig('result', 'first_name'),
                    last_name: bot_info.dig('result', 'last_name'))

      bot.update(username: result[:username], name: result[:first_name])
    end

    if webhook_info.present? && webhook_info['ok'].to_boolean && bot_info.dig('result', 'url').present?
      result.merge!(webhook_url: webhook_info.dig('result', 'url'))

      bot.update(webhook_url: result[:webhook_url])
    else
      url = webhook_url(bot)
      webhook_info = provider.set_webhook(url)

      if webhook_info['ok'].to_boolean
        bot.update(webhook_url: url, webhook_set_at: Time.current)
        result.merge!(webhook_url: url)
      end
    end

    result
  end

  def webhook_url(bot)
    "https://#{ENV['NGROK_HOST']}/webhooks/telegram/#{bot.id}/#{bot.token}"
  end

  def bot_provider(bot)
    @bot_provider ||= begin
                        case bot.provider
                        when 'telegram'
                          TelegramApi.new(bot.token)
                        else
                          nil
                        end
                      end
  end
end