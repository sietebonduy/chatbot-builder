class AddDefaultResponseToBots < ActiveRecord::Migration[8.0]
  def change
    add_column :bots, :default_response, :string, default: ''
  end
end
