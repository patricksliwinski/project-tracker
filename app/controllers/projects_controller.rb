class ProjectsController < ApplicationController
    before_action :authenticate_user!

    def index
        @project = Project.new # Needed for the form to create a new project
        @num_projects = current_user.projects.count
        @total_time = current_user.projects.sum(:total_time)
        @num_milestones = current_user.projects.sum(:num_milestones)
    end

    def show
        @project = current_user.projects.find(params[:id])
        @milestone_data = @project.milestones.map do |milestone| 
            [milestone.description, milestone.created_at]
        end
        @milestone_data.insert(0, ["Start", @project.created_at])
        @milestone_data = @milestone_data.sort_by { |milestone| milestone[1] }
        puts @milestone_data[0][1]
    end

    def new
        @project = Project.new
    end

    def create
        @project = Project.new(project_params)
        @project.user = current_user
        @project.total_time = 0
        @project.num_milestones = 0
        @project.num_sessions = 0
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