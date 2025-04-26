class CreateEdges < ActiveRecord::Migration[8.0]
  def change
    create_table :edges, id: :uuid do |t|
      t.references :scenario, null: false, foreign_key: true
      t.uuid :source, null: false
      t.uuid :target, null: false
      t.string :type
      t.jsonb :data, default: {}
      t.timestamps
    end

    add_index :edges, :source
    add_index :edges, :target
  end
end
