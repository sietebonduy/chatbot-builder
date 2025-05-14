class CreateChats < ActiveRecord::Migration[8.0]
  def change
    create_table :chats do |t|
      t.bigint :client_id, null: false
      t.bigint :bot_id, null: false

      t.timestamps
    end

    add_index :chats, [:client_id, :bot_id], unique: true
  end
end
