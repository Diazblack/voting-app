class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token 

  def create
    existing_user = User.find_by(email: user_params["email"])
    if existing_user
      session[:user_id] = existing_user.id
      render json: { message: "User Found", user: existing_user }, status: :ok
    else
      new_user = User.new(user_params)
      if new_user.save()
        session[:user_id] = new_user.id
        render json: { message: "User created", user: new_user }, status: :created
      else 
        render json: { errors: new_user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def update 
    current_user.update(vote_id: user_params[:vote_id]) 
  end

  private
  def user_params
    params.require(:user).permit(:email, :password_digest, :zip_code, :vote_id)
  end
end
