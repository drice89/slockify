class Api::UsersController < ApplicationController
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
      user_data = { 
        email: spotify_user.email, 
        full_name: spotify_user.display_name, 
        avatar_url: spotify_user.images[0].url, 
        spotify_user_info: hash,
#### MUST BE MODIFIED PRIOR TO PRODUCTION ###
        password: SpotifyCredentialsDev::CLIENT_SECRET
        ############################################
      }
      @user = User.new(user_data)
      save = @user.save
      if !save
        render json: @user.errors.full_messages, status: 421
        return
      end
    else
        @user.spotify_user_info = hash
    end
    login(@user)
    generalChannelId = Conversation.find_by(name: "General").id
    Membership.create(member_id: @user.id, conversation_id: generalChannelId)
    redirect_to 'http://localhost:3000/#/client'
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
