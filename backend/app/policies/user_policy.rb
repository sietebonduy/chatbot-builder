# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def index?
    admin?
  end

  def update?
    same_user? || admin?
  end

  private

  def same_user?
    record.id == user.id
  end
end
