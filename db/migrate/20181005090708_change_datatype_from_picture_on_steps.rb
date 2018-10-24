class ChangeDatatypeFromPictureOnSteps < ActiveRecord::Migration[5.1]
  def change
    change_column :steps, :picture, :string
  end
end
