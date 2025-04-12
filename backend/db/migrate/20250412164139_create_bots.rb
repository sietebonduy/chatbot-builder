class CreateBots < ActiveRecord::Migration[8.0]
  def change
    create_table :bots do |t|
      t.string :provider
      t.string :token
      t.integer :user_id
      t.jsonb :extra, default: {}

      t.timestamps
    end

    add_index :bots, :user_id
  end
end
