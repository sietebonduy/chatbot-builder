# frozen_string_literal: true

class Api::V1::AnalyticsController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    result = ::Analytic::Index.call(current_user, params)

    if result.successful?
      render json: result.data
    else
      render_service_error(result)
    end
  end

  def messages_over_time
    bot_ids = current_user.bots.pluck(:id)
    since = 30.days.ago.beginning_of_day

    data = Message.joins(:chat)
                  .where(chats: { bot_id: bot_ids }, created_at: since..Time.current)
                  .group("DATE(messages.created_at)")
                  .order("DATE(messages.created_at)")
                  .count

    render json: data
  end

  def chats_over_time
    bot_ids = current_user.bots.pluck(:id)
    since = 30.days.ago.beginning_of_day

    data = Chat.where(bot_id: bot_ids, created_at: since..Time.current)
               .group("DATE(created_at)")
               .order("DATE(created_at)")
               .count

    render json: data
  end

  # todo: add scope for current_user
  def messages_by_hour
    extract_hour = Arel.sql("EXTRACT(HOUR FROM messages.created_at)")

    messages = Message.all
                      .select("#{extract_hour} AS hour", "COUNT(*) AS total")
                      .group(extract_hour)
                      .order(extract_hour)

    result = messages.each_with_object({}) do |m, h|
      h[m.hour.to_i] = m.total.to_i
    end

    render json: result
  end
end