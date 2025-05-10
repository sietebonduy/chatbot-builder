class AddLocaleToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :locale, :integer, default: 0
  end
end
