class Project < ApplicationRecord
  belongs_to :user
  validates_presence_of :name
  has_many :sessions
  has_many :milestones

  def for_calendar_chart
    {
      data: self.sessions.group_by_day(:date).sum(:time).to_a
    }
  end

  def for_line_chart
    data = Hash.new
    data[self.created_at.to_date] = 0
    cumulative_time = 0
    self.sessions.order(date: :asc).each do |session|
      cumulative_time += session.time
      data[session.date.to_date] = cumulative_time / 3600.0
    end
    data
  end

  def create_session_hash
    data = Hash.new
    data[self.created_at.to_date] = [0]
    cumulative_time = 0
    self.sessions.order(date: :asc).each do |session|
      cumulative_time += session.time
      data[session.date.to_date] = [cumulative_time / 3600.0]
    end
    data
  end

  def for_line_chart_2
    session_data = self.create_session_hash
    data = Hash.new
    data[:data] = []
    data[:points] = []

    self.milestones.each do |milestone|
      session_data[milestone.created_at.to_date].append(milestone.description)
      point = Hash.new
      point[:xAxis] = milestone.created_at.to_date
      point[:yAxis] = session_data[milestone.created_at.to_date][0]
      data[:points].append(point)
    end

    session_data.each do |date, value|
      data[:data].append([date].concat(value))
    end

    data
  end
end
