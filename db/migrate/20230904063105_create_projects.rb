class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.integer :num_milestones
      t.integer :num_sessions
      t.integer :total_time

      t.timestamps
    end
  end
end
