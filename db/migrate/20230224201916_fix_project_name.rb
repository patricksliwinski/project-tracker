class FixProjectName < ActiveRecord::Migration[7.0]
  def change
    rename_column :projects, :description, :name
  end
end
