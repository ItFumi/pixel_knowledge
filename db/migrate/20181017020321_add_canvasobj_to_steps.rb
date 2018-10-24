class AddCanvasobjToSteps < ActiveRecord::Migration[5.1]
  def change
    add_column :steps, :canvas_obj, :text
  end
end
