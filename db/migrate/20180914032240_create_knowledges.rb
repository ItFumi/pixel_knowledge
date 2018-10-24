class CreateKnowledges < ActiveRecord::Migration[5.1]
  def change
    create_table :knowledges do |t|
      t.string :title
      t.string :content
      t.integer :user_id
      t.timestamps
    end
  end
end
