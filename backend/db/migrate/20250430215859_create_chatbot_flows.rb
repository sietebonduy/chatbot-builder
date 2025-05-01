class CreateChatbotFlows < ActiveRecord::Migration[8.0]
  def change
    create_table :chatbot_flows do |t|
      t.string :name, null: false
      t.string :slug
      t.text :description

      t.jsonb :flow_data, null: false, default: {
        nodes: [],
        edges: [],
        variables: {},
        metadata: {}
      }

      t.boolean :published, default: false
      t.datetime :published_at

      t.references :user, null: false, foreign_key: true
      t.timestamps
    end

    add_index :chatbot_flows, :flow_data, using: :gin
  end
end
