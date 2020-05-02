class Api::ConversationsController < ApplicationController
  def index
    @conversations = Conversation.where({is_private?: [false, nil]})
    render :index
  end

  def show 
    @conversation = Conversation.find_by(id: params[:id])
    if @conversation
      render :show
    else
      render json: ["Conversation not found"], status: 404
    end
  end

  def create
    @conversation = Conversation.new(conversation_params)
    @membership = Membership.new(member_id: params[:user_id], conversation_id: @conversation.id)
    if @conversation.save && @membership.save
      render :show
    else
      render json: @conversation.errors.full_messages + @membership.errors.full_messages, status: 422
    end
  end

  def update
    @conversation = Conversation.find_by(id: params[id])
    if @conversation.update(conversation_params)
      render :show
    else
      render json: @conversation.errors.full_messages, status: 422
    end
  end

  def destroy
    
  end


  private
  def conversation_params
    params.require(:conversation).permit(:name, :owner_id, :convo_type, :description, :is_private?, :playlist_url, :restricted_playlist?)
  end
end
