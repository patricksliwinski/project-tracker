class Project < ApplicationRecord
  belongs_to :user
  validates_presence_of :name
  has_many :sessions

  def for_calendar_chart
    {
      data: self.sessions.group_by_day(:date).sum(:time).to_a
    }
  end
end
