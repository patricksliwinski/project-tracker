class SessionsController < ApplicationController
    def create
        @project = Project.find(params[:project_id])
        @session = @project.sessions.create(session_params)
        @session.date = DateTime.now
        puts @project
        @session.save
        @project.update(total_time: @project.total_time + @session.time)
        redirect_to project_path(@project)
    end

    private
        def session_params
            params.require(:session).permit(:time)
        end
end