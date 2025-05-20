class CandidatesController < ApplicationController
  before_action :authenticate_user!

  def index
    Candidate.all()
  end

  def new
  end

  def create
  end
end
