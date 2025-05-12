class CustomDeviseMailer < Devise::Mailer
  default template_path: 'devise/mailer'
  layout 'mailer'

  def reset_password_instructions(record, token, opts = {})
    super
  end

  def confirmation_instructions(record, token, opts = {})
    super
  end

  def unlock_instructions(record, token, opts = {})
    super
  end
end
