class CandidatesController < ApplicationController
  skip_before_action :verify_authenticity_token 
  before_action :authenticated_user!

  def index
    @candidates = Candidate.all()
  end


  def create
    puts candidate_params
    existing_candidate = Candidate.find_by(name: candidate_params["name"])
    if existing_candidate 
      current_user.update(vote: existing_candidate)
      render json: { message: "Succesfully Casted Voted", user: candidate }, status: :created
    else 
      new_candidate = Candidate.new(candidate_params)
      if new_candidate.save() 
        current_user.update(vote: new_candidate)
        render json: { message: "Succesfully Creaate and Voted for New candidate", user: new_candidate }, status: :created
      else
        ender json: { errors: new_candidate.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  private 

  def candidate_params
    params.require(:candidate).permit(:name)
  end
end
