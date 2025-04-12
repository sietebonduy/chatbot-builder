# frozen_string_literal: true

class User::Show
  include KindOfService
  include ActionPolicy::Behaviour

  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  private

  def perform
    user = User.find(@params[:id])
    authorize!(user, to: :show?, context: auth_context)

    success(user)
  rescue => e
    error(e.message)
  end

  def auth_context
    { user: @current_user }
  end
end
