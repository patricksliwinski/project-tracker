class ProjectsController < ApplicationController

    def index
        @project = Project.new
    end

    def show
        @project = Project.find(params[:id])
        @session = Session.new
    end

    def new
        @project = Project.new
    end

    def create
        @project = Project.new(project_params)
        @project.user = current_user
        @project.total_time = 0
        @project.last_worked_on = DateTime.now
        if @project.save
            redirect_to project_path(@project)
        else
            render :new, status: :unprocessable_entity
            puts @project.errors.full_messages.first
        end
    end
    
    private
        def project_params
            params.require(:project).permit(:name)
        end
end