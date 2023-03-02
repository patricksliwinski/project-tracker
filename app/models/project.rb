class Project < ApplicationRecord
  belongs_to :user
  validates_presence_of :name
  has_many :sessions

  def for_calendar_chart
    {
      data: self.sessions.group_by_day(:date).sum(:time).to_a
    }
  end

  def for_line_chart
    data = Hash.new
    data[self.created_at.to_datetime] = 0
    cumulative_time = 0
    self.sessions.order(date: :asc).each do |session|
      cumulative_time += session.time
      data[session.date.to_datetime] = cumulative_time / 3600.0
    end
    data
  end
end
