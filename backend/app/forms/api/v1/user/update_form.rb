# frozen_string_literal: true

class Api::V1::User::UpdateForm
  def initialize(params)
    @params = params
  end

  # TODO: Fix issue with admin param
  def params
    @params.permit(:id, :email, :first_name, :last_name, :admin, :avatar, :locale)
  end
end
