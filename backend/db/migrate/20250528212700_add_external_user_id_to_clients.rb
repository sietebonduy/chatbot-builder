class AddExternalUserIdToClients < ActiveRecord::Migration[8.0]
  def change
    add_column :clients, :external_user_id, :bigint
  end
end
