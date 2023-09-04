class Project < ApplicationRecord
    belongs_to :user
    has_many :sessions, dependent: :destroy
    has_many :milestones, dependent: :destroy
    validates :name, presence: true
end
