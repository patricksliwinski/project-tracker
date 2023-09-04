class AddProjectToMilestones < ActiveRecord::Migration[7.0]
  def change
    add_reference :milestones, :project, null: false, foreign_key: true
  end
end
