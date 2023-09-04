class AddProjectToSessions < ActiveRecord::Migration[7.0]
  def change
    add_reference :sessions, :project, null: false, foreign_key: true
  end
end
