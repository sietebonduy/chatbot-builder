class CreateNodes < ActiveRecord::Migration[8.0]
  def change
    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')

    create_table :nodes, id: :uuid do |t|
      t.references :scenario, null: false, foreign_key: true
      t.string :type, null: false
      t.jsonb :data, null: false, default: {}
      t.float :position_x, null: false
      t.float :position_y, null: false
      t.timestamps
    end
  end
end
