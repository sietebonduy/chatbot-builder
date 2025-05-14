class CreateMessages < ActiveRecord::Migration[8.0]
  def change
    create_table :messages do |t|
      t.bigint :chat_id, null: false
      t.boolean :from_bot, null: false, default: false
      t.text :content, null: false

      t.timestamps
    end
  end
end
