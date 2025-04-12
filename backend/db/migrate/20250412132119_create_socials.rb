class CreateSocials < ActiveRecord::Migration[8.0]
  def change
    create_table :socials do |t|
      t.references :user, null: false, foreign_key: true
      t.string :provider
      t.string :uid
      t.string :email
      t.jsonb :extra, default: {}

      t.timestamps
    end
  end
end
