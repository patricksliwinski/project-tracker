class ProjectsController < ApplicationController
    before_action :authenticate_user!

    def index
        @num_projects = current_user.projects.count
        @total_time = current_user.projects.sum(:total_time)
        @num_milestones = current_user.projects.sum(:num_milestones)
    end

    def show
        @project = current_user.projects.find(params[:id])
    end

    def new
        @project = Project.new
    end

    def create
        @project = Project.new(project_params)
        @project.user = current_user
        @project.total_time = 0
        @project.num_milestones = 0
        if @project.save
            redirect_to project_path(@project)
        else
            render :new, status: :unprocessable_entity
            puts @project.errors.full_messages.first
        end
    end

    def destroy
        @project = current_user.projects.find(params[:id])
        @project.destroy

        redirect_to projects_path
    end

    private
        def project_params
            params.require(:project).permit(:name)
        end
end