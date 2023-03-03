class MilestonesController < ApplicationController
    def create
        @project = Project.find(params[:project_id])
        @milestone = @project.milestones.create(milestone_params)
        @session = @project.sessions.create()
        @session.time = 0
        @milestone.save
        @session.date = @milestone.created_at
        @session.save
        # @project.update(total_time: @project.total_time + @session.time)
        redirect_to project_path(@project)
    end

    private
        def milestone_params
            params.require(:milestone).permit(:description)
        end
end