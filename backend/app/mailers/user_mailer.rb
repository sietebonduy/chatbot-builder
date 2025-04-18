# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def welcome_email(user_id)
    @current_user = User.find(user_id)
    return if @current_user.blank?

    @subject = I18n.t('mailers.user_mailer.welcome_email.subject')

    mail to: @current_user.email, subject: @subject
  end
end
