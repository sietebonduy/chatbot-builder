# frozen_string_literal: true

class UserMailerPreview < ActionMailer::Preview
  def welcome_email
    current_user = User.first

    UserMailer.welcome_email(current_user.id)
  end
end
