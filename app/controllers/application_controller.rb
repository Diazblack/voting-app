class ApplicationController < ActionController::Base
  helper_method :current_user

  def current_user 
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def authenticated_user! 
    unless current_user
      redirect_to root_path, alert: "You most be logged in to access this page"
    end
  end
end
