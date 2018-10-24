class ChangeColumnToUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :username
    change_column :users, :name, :string, null: false, default: ""
  end
end
