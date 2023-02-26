class ChangeTotalTimeToInt < ActiveRecord::Migration[7.0]
  def change
    remove_column :projects, :total_time
    add_column :projects, :total_time, :integer
  end
end
