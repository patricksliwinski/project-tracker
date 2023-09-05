class SessionsController < ApplicationController
    before_action :authenticate_user!

    def create
        @project = current_user.projects.find(params[:project_id])
        @session = @project.sessions.new(session_params)
        @session.project = @project
        @session.save
        @project.update(total_time: @project.total_time + @session.duration)
        redirect_to project_path(@project)
    end

    private
        def session_params
            params.require(:session).permit(:duration)
        end