class CreateSteps < ActiveRecord::Migration[5.1]
  def change
    create_table :steps do |t|
      t.binary :picture
      t.string :comment
      t.integer :knowledge_id
      t.timestamps
    end
  end
end
