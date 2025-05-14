class CreateClients < ActiveRecord::Migration[8.0]
  def change
    create_table :clients do |t|
      t.string :chat_id, null: false
      t.string :first_name
      t.string :last_name
      t.string :username
      t.bigint :bot_id, null: false

      t.timestamps
    end

    add_index :clients, [:chat_id, :bot_id], unique: true
  end
end
