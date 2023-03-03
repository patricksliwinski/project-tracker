class AddMilestoneSessionCountsToProject < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :num_milestones, :integer
    add_column :projects, :num_sessions, :integer
  end
end
