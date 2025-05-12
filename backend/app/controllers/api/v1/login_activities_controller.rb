# frozen_string_literal: true

class Api::V1::LoginActivitiesController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    activities = current_user.login_activities
                             .where(strategy: 'database_authenticatable', success: true)
                             .order(created_at: :desc)
                             .limit(5)

    render json: LoginActivitySerializer.new(activities).serializable_hash.to_json
  end
end
