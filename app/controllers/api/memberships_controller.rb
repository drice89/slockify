class Api::MembershipsController < ApplicationController
  def create
    @membership = Membership.new(membership_params)
    if @membership.save
      #gonna have to figure this one out
      @conversation = @membership.conversation
      render "/api/conversations/show"
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  def update
    #this never got tested
    #check the params in the statement below- its probably not correct
    @membership = membership_res
    if @membership.update(membership_params)
      render "/api/conversations/show"
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  def destroy
    @membership = membership_res
    if @membership.destroy
      render "/api/conversations/show"
    else
      render json: ["Subscription not found"], status: 404
    end
  end

  private
  def membership_params
    params.require(:membership).permit(:member_id, :conversation_id, :is_admin?)
  end

  def membership_res
    Membership.find_by(member_id: params[:membership][:member_id], conversation_id: params[:membership][:conversation_id])
  end
end
