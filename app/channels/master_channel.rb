class MasterChannel < ApplicationCable::Channel

  def subscribed
    # stream_from "some_channel"
    stream_for "master"
    User.find(params["user"][:id]).update(status: "active")
    MasterChannel.broadcast_to("master", format_user(params["user"]))
  end

  # t.string "name", null: false
  #   t.text "description"
  #   t.integer "owner_id", null: false
  #   t.boolean "is_private?"
  #   t.string "playlist_url"
  #   t.boolean "restricted_playlist?"
  #   t.string "convo_type", null: false
  def create_conversation(data)
    data.deep_transform_keys! { |key| key.underscore }
    conversation = Conversation.create(data["conversation"])
    data["members"].each do |member|
      self.new_membership(member["user_id"], convsersation.id, member["admin"])
    end
    socket = { message: conversation.attributes.deep_transform_keys! { |key| key.camelize(:lower) }, action: "new" }
    MasterChannel.broadcast_to("master", socket)

  end
  
  #check behavior of did_update for each case to make sure that we are getting a falsey value in the event of a error
  def edit_conversation(data)
    member_id = data["member"]["id"]
    conversation_id = data["conversation"]["id"]
    did_update = nil
    action = "edit"

    case data["requestType"]
      when "edit conversation"
        did_update = find_convo(conversation_id).update(data["conversation"])
      when "add member"
        did_update = new_membership(member_id, conversation_id)
      when "toggle admin"
        did_update = toggle_admin(member_id, conversation_id)
      when "leave conversation"
        did_update = delete_membership(member_id, conversation_id)
        action = "remove"
    end

   broadcast_to("master", create_socket(conversation_id, action) ) if did_update
  end
  
    
  def unsubscribed
    User.find(params[:user][:id]).update(status: "offline")
    MasterChannel.broadcast_to("master", format_user(params[:user]))
    # Any cleanup needed when channel is unsubscribe
  end
  




  private
  #member_id, conversation_id
  def new_membership(user_id, conversation_id, admin=false)
    Membership.create({member_id: user_id, conversation_id: conversation_id, admin: admin})
  end

  def delete_membership(user_id, conversation_id)
    membership = Membership.find_by(user_id: user_id, conversation_id: conversation_id)
    membership.destroy
  end

  def toggle_admin(user_id, conversation_id)
    membership = Membership.find_by(user_id: user_id, conversation_id: conversation_id)
    membership.update(admin: !membership[:admin])
  end
    
  def create_socket(conversation_id, action)
    conversation = find_convo(conversation_id);
    socket = { 
                conversation: conversation.attributes.deep_transform_keys! { |key| key.camelize(:lower) }, 
                action: action 
              }
  end

  def format_user(hash)
    { user: {id: hash[:id], status: hash[:status]}, action: "status" }
  end

end
