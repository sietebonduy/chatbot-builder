class AddAdditionalFieldsToBots < ActiveRecord::Migration[8.0]
  def change
    add_column :bots, :username, :string
    add_column :bots, :bot_id, :string
    add_column :bots, :name, :string
    add_column :bots, :is_active, :boolean, default: true
    add_column :bots, :webhook_url, :string
    add_column :bots, :webhook_set_at, :datetime
    add_column :bots, :last_used_at, :datetime
    add_column :bots, :default_reply, :text
    add_column :bots, :message_count, :integer, default: 0
    add_column :bots, :error_count, :integer, default: 0
  end
end
