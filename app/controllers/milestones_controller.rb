class MilestonesController < ApplicationController
    before_action :authenticate_user!

    def create
        @project = current_user.projects.find(params[:project_id])
        @milestone = @project.milestones.new(milestone_params)
        @milestone.project = @project
        @milestone.save
        @project.update(num_milestones: @project.num_milestones + 1)
        redirect_to project_path(@project)
    end

    private
        def milestone_params
            params.require(:milestone).permit(:description)
        end
end