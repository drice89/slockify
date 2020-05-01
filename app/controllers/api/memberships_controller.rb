class Api::MembershipsController < ApplicationController
  def create
    @membership = Membership.new(membership_params)
    if @membership.save
      #gonna have to figure this one out
      render :show
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  def update
    @membership = Membership.find_by(id: params[:id])
    if @membership.update(membership_params)
      render :show
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  def destroy
    @membership = Membership.find_by(id: params[:id])
    if @membership.destroy
      render :show
    else
      render json: ["Subscription not found"], status: 404
    end
  end

  private
  def membership_params
    params.require(:membership).permit(:member_id, :conversation_id, :is_admin?)
  end
end
