class Session < ApplicationRecord
  belongs_to :project

  def Session.for_calendar_chart
    day = 10.days.ago
    {
      data: [[day.to_date, 50]]
    }
  end
end
