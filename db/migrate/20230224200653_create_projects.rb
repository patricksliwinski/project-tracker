class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :description
      t.datetime :last_worked_on
      t.time :total_time
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
