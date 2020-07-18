class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @conversation = find_convo(params['room'])
    stream_for @conversation #=> this streams for the conversation object- NOT THE ID
    #specific to messages within a channel
  end

  def speak(data)
      data.deep_transform_keys! { |key| key.underscore }
      unless data["message"]["body"].starts_with?("/add_song")
        message = Message.create(data["message"])
        socket = { message: message.attributes.deep_transform_keys! { |key| key.camelize(:lower) }, action: "new" }
        ChatChannel.broadcast_to(find_convo(message.recipient_id), socket)
      else
        @credentials = User.find_by(id: data["message"]["author_id"]).spotify_user_info
        begin
          track = RSpotify::Track.find(data["message"]["body"].split("/add_song")[1].strip)
        rescue
          return ChatChannel.broadcast_to(find_convo(data["message"]["recipient_id"]), {action: "error", user: data["message"]["author_id"], error: "track ID not found"})
        end
        if @credentials && track
          @spotify_user = RSpotify::User.new(JSON.parse(@credentials))
          @playlist = RSpotify::Playlist.find_by_id(data["playlist_url"])
          @playlist.add_tracks!([track]) if @playlist
          ChatChannel.broadcast_to(find_convo(data["message"]["recipient_id"]), {action: "add song", user: data["message"]["author_id"]})
        else
          ChatChannel.broadcast_to(find_convo(data["message"]["recipient_id"]), {action: "error", user: data["message"]["author_id"], error: "You must login with Spotify to access that feature"})
        end
      end
  end
  
  def update(data)
    #deeply transform camel case to snake case
    data.deep_transform_keys! { |key| key.underscore }
    target_message = find_message(data["message"]["id"]) 
    message = target_message.update(data["message"])
    #deeply transfrom snake case back into camel
    data.deep_transform_keys! { |key| key.camelize(:lower) }
    if message
      socket = data 
    else
      socket = { error: "update was not saved", action: "error"}
    end
    ChatChannel.broadcast_to(find_convo(data["message"]["recipientId"]), socket)
  end

  def remove(data)
    target_message = find_message(data["message"]["id"]) 
    target_message.destroy
    #you had to change the structure of remove message to take the entire message
    #this was done because there is a selector that pushes the messages out of the store on a per conversation basis
    #this selector iterates through the messages Id array in the conversation object pushes the corresponding messages into
    #an array. In order to remove an object from that array we need to know which conversation its from and then which message
    #to delete
    ChatChannel.broadcast_to(find_convo(data["message"]["recipientId"]), data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  private

    def find_message(message_id)
      Message.find_by(id: message_id)
    end
end
