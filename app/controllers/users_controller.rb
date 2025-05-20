class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token 

  def create
    existing_user = User.find_by(email: user_params["email"])
    puts user_params
    if existing_user
      # This should navigate to the votes index route
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

  private
  def user_params
    params.require(:user).permit(:email, :password_digest, :zip_code)
  end
end
