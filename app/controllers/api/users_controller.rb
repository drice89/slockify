class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, :only => [:spotify]
  #users index view has not yet been created 
  def index
    @users = User.all
    render :index
  end

   def create
    @user = User.new(create_user_params)
    if @user.save
      login(@user)
      generalChannelId = Conversation.find_by(name: "General").id
      Membership.create(member_id: @user.id, conversation_id: generalChannelId)
      render :show
    else
      render json: @user.errors.full_messages, status: 421
    end
  end

  def spotify
    spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
    @user = User.find_by(email: spotify_user.email)
    hash = spotify_user.to_json
    if !@user
      client_secret = ENV["CLIENT_SECRET"] 
      user_data = { 
        email: spotify_user.email, 
        full_name: spotify_user.display_name, 
        avatar_url: spotify_user.images[0].url, 
        spotify_user_info: hash,
        password: client_secret
      }
      @user = User.new(user_data)
      save = @user.save
      if !save
        render json: @user.errors.full_messages, status: 421
        return
      end
      generalChannelId = Conversation.find_by(name: "General").id
      Membership.create(member_id: @user.id, conversation_id: generalChannelId)
    else
      @user.update(avatar_url: spotify_user.images[0].url, spotify_user_info: hash)
    end
    login(@user)
    if ENV["RAILS_ENV"] == "production"
      redirect_to 'https://slockify.herokuapp.com/#/client'
    else
      redirect_to 'http://localhost:3000/#/client'
    end
  end

  def failure
    if ENV["RAILS_ENV"] == "production"
      redirect_to 'https://slockify.herokuapp.com/#/login'
    else
      redirect_to 'http://localhost:3000/#/login'
    end 
  end

  private
  def create_user_params
    params.require(:user).permit(:email, :password, :full_name, :display_name, :spotify_user_info)
  end

  ##do we want to make a separate route specifically to update status so we arent sending this data all the time?
  def update_user_params
    params.require(:user).permit(:email, :password, :full_name, :display_name, :title, :description, :status, :avatar_url, :spotify_user_info)
  end
end
