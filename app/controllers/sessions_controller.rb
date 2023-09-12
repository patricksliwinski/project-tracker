class SessionsController < ApplicationController
    before_action :authenticate_user!

    def create
        @project = current_user.projects.find(params[:project_id])
        @session = @project.sessions.new(session_params)
        @session.project = @project
        @session.save
        puts "hello"
        puts @session.duration
        puts "hello"
        @project.update(total_time: @project.total_time + @session.duration)
        @project.update(num_sessions: @project.num_sessions + 1)
        redirect_to project_path(@project)
    end

    private
        def session_params
            params.require(:session).permit(:duration)
        end
end