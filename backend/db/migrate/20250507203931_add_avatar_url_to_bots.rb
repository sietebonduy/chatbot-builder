class AddAvatarUrlToBots < ActiveRecord::Migration[8.0]
  def change
    add_column :bots, :avatar_url, :string
  end
end
