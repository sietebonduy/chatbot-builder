# frozen_string_literal: true

class ChatbotFlow::Update
  include KindOfService

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  private

  def perform
    flow = ChatbotFlow.friendly.find(@params[:id])

    update_params = build_params(flow)
    flow.update(update_params)

    success(flow)
  rescue => e
    error(e)
  end

  def build_params(flow)
    {}.tap do |params|
      params[:published] = published?
      params[:name] = @params[:name] if @params[:name].present?
      params[:description] = @params[:description] if @params[:description].present?
      params[:published_at] = Time.current if published?
      params[:flow_data] = @params[:flow_data] if scenario_has_changed?(flow)
      params[:bot_id] = @params[:bot_id] if @params[:bot_id].present?
    end
  end

  def scenario_has_changed?(flow)
    @params[:flow_data].present? && (@params[:flow_data] != flow.flow_data)
  end

  def published?
    @params[:published].to_boolean
  end
end