class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.text :content
      t.integer :knowledge_id
      t.integer :user_id
      t.timestamps
    end
  end
end
