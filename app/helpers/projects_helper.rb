module ProjectsHelper
    def total_seconds_to_hours_minutes(seconds)
        hours = seconds.div(3600)
        minutes = (seconds - (hours * 3600)).div(60)
        "%d hours %d minutes" % [hours, minutes]
    end

    def total_seconds_to_hours(seconds)
        hours = seconds / 3600.0
        "%.1f Hours" % [hours]
    end
end