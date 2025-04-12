# frozen_string_literal: true

class Webhooks::Telegram::ReceiveForm
  def initialize(params)
    @params = params
  end

  def params
    @params.permit(
      :update_id,
      :bot_token,
      message: [
        :message_id,
        :date,
        :text,
        { from: [:id, :is_bot, :first_name, :last_name, :username, :language_code] },
        { chat: [:id, :type, :title, :username, :first_name, :last_name] },
        { entities: [:type, :offset, :length] },
        { photo: [:file_id, :file_unique_id, :file_size, :width, :height] },
        { document: [:file_id, :file_name, :mime_type, :file_size] },
        { location: [:longitude, :latitude] },
        { contact: [:phone_number, :first_name, :last_name, :user_id] },
        :caption
      ],
      edited_message: {},
      channel_post: {},
      edited_channel_post: {},
      callback_query: [
        :id,
        :data,
        { from: [:id, :is_bot, :first_name, :last_name, :username] },
        { message: [
          :message_id,
          { chat: [:id, :type, :title, :username] },
          :text
        ]}
      ],
      inline_query: [:id, :query, :offset],
      chosen_inline_result: [:result_id, :query],
      poll: [:id, :question, options: [:text, :voter_count]],
      poll_answer: [:poll_id, option_ids: []],
      my_chat_member: { chat: [:id, :type], from: [:id, :first_name], new_chat_member: [:status] },
      chat_member: { chat: [:id, :type], from: [:id, :first_name], new_chat_member: [:status] }
    )
  end
end
