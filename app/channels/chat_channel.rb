class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    #debugger #what is coming from params?
    #@conversation = Conversation.find_by(params["conversation_id"])
    #stream_from @conversation
    stream_for 'chat_channel' #=> should be the conversation id
    #specific to messages within a channel
  end

  def speak(data)
    data = data.deep_transform_keys! { |key| key.underscore }
    message = Message.create(data["message"])
    socket = { message: message.body }
    ChatChannel.broadcast_to('chat_channel', socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
