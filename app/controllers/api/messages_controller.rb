class Api::MessagesController < ApplicationController
  def index
    @messages = Conversation.find_by(recipient_id: params[:recipient_id]).messages
    render :show
  end

  def show
    @message = Message.find_by(id: params[:id])
    if @message
      render :show
    else
      render json: ["Message not found"], status: 404
    end
  end

  def create
    @message = Message.new(message_params)
    if @message.save
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def update
    @message = Message.find_by(id: params[:id])
    if @message.update(message_params)
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def destroy
    @message = Message.find_by(id: params[:id])
    @message.destroy
    render :show
  end

  private 
  def message_params
    params.requires(:message).permit(:body, :author_id, :recipient_id)
  end
end
