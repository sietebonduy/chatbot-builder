class AddDeviceFieldsToLoginActivities < ActiveRecord::Migration[8.0]
  def change
    add_column :login_activities, :device_type, :string
    add_column :login_activities, :device_name, :string
    add_column :login_activities, :os_name, :string
    add_column :login_activities, :os_version, :string
    add_column :login_activities, :browser_name, :string
    add_column :login_activities, :browser_version, :string
  end
end
