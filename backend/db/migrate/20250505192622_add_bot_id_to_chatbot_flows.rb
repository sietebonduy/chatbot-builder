class AddBotIdToChatbotFlows < ActiveRecord::Migration[8.0]
  def change
    add_column :chatbot_flows, :bot_id, :bigint
  end
end
