class MasterChannel < ApplicationCable::Channel

  def subscribed
    # stream_from "some_channel"
    stream_for "master"
    @user = User.find(params["user"])
    @user.update(status: "active")
    MasterChannel.broadcast_to("master", format_user(@user))
  end

  def create_conversation(data)
    data.deep_transform_keys! { |key| key.underscore }
    data["conversation"]["name"] = generate_dm_name(data["members"]) if data["conversation"]["convo_type"] != "channel"
    conversation = Conversation.new(data["conversation"])
    existing_id = Conversation.find_by(name: conversation.name)

    if conversation.valid?
      if conversation.convo_type == "channel"
        playlist = create_playlist(data["conversation"])
        conversation.playlist_url = playlist.id 
      end
      conversation.save

      #refactor this code
      members = []
      data["members"].each_value do |value|
        membership = new_membership(value["id"], conversation.id)
        #this needs to capture any errors 
        members.push(membership) if membership
      end
      members = members.map { |member| member.member_id}
      
      conversation = conversation.attributes.deep_transform_keys! { |key| key.camelize(:lower) }
      conversation["memberIds"] = members

      socket = { conversation: conversation, action: "new" }
      MasterChannel.broadcast_to("master", socket)

    elsif existing_id
      socket = { error: "conversation already exists", conversation: { id: existing_id.id, memberIds: [conversation.owner_id] }, action: "new", requestingUser: data["current_user"]}
      MasterChannel.broadcast_to("master", socket)

    else
      socket = { error: "Invalid parameters", action: "error"}
      MasterChannel.broadcast_to("master", socket)
    end

  end
  
  #check behavior of did_update for each case to make sure that we are getting a falsey value in the event of a error
  def edit_conversation(data)
    data.deep_transform_keys! { |key| key.underscore }
    conversation_id = data["conversation"]["id"]
    did_update = nil
    action = "edit"
    case data["request_type"]
      when "edit conversation"
        did_update = find_convo(conversation_id).update(data["conversation"])
      when "add member"
        updated_members = []
        member_count = 0
        data["members"].each do |member_id, member|
          member_count += 1
          if new_membership(member_id, conversation_id)
            updated_members << member_id
          end
        end
        if updated_members.length == member_count
          did_update = true
        end
      when "toggle admin"
        did_update = toggle_admin(member_id, conversation_id)
      when "leave conversation"
        did_update = delete_membership(member_id, conversation_id)
        action = "remove"
    end
   MasterChannel.broadcast_to("master", create_socket(conversation_id, action) )
  end
    
  def unsubscribed
    # User.find(params["user"]).update(status: "offline")
    # MasterChannel.broadcast_to("master", format_user(params[:user]))
    # Any cleanup needed when channel is unsubscribe
  end
  
  private
  #member_id, conversation_id
  def new_membership(user_id, conversation_id, admin=false)
    Membership.create!({member_id: user_id, conversation_id: conversation_id, is_admin?: admin})
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
    member_ids = conversation.member_ids
    socket = { 
                conversation: conversation.attributes.deep_transform_keys! { |key| key.camelize(:lower) }, 
                action: action 
              }
    socket[:conversation]["memberIds"] = member_ids
    return socket
  end

  def format_user(hash)
    { 
      user: 
      {
        id: hash["id"], status: hash["status"]
      }, 
      action: "status" 
    }
  end

  def generate_dm_name(members)
    ids = []
    members.each_value do |value| 
      ids << value["id"]
    end
    ids.sort
  end

  def create_playlist(conversation)
    @credentials = User.find(1).spotify_user_info
    @master_spotify_user = RSpotify::User.new(JSON.parse(@credentials))
    #create_playlist_with_options! is monkey patched in config/initializers/overrides.rb
    @master_spotify_user.create_playlist_two!(conversation["name"], conversation["description"])
  end
end

# t.string "name", null: false
  #   t.text "description"
  #   t.integer "owner_id", null: false
  #   t.boolean "is_private?"
  #   t.string "playlist_url"
  #   t.boolean "restricted_playlist?"
  #   t.string "convo_type", null: false