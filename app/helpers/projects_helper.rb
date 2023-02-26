module ProjectsHelper
    def total_seconds_to_hours(project)

        print("%d time" % project.total_time)
        hours = project.total_time.div(3600)
        minutes = (project.total_time - (hours * 3600)).div(60)
        "%d hours %d minutes" % [hours, minutes]
    end
end
