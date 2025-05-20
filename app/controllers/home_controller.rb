class HomeController < ApplicationController
  def index
    @message = "Hello, world!"
    @user = User.new()
  end
end
