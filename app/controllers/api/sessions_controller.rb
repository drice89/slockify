class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: {errors: ["Invalid Credentials!"]}, status: 401
    end
  end

  def destroy
    if current_user
      logout
      render json: status: 200
    else
      render json: {errors: ["There is no current user"]}, status: 420
    end
  end
end
