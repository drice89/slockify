class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @conversation = find_convo(params['room'])
    stream_for @conversation #=> should be the conversation id
    #specific to messages within a channel
  end

  def speak(data)
    data = data.deep_transform_keys! { |key| key.underscore }
    message = Message.create(data["message"])
    socket = { message: message.attributes.deep_transform_keys! { |key| key.camelize(:lower) }, action: "UPDATE" }
    ChatChannel.broadcast_to(find_convo(message.recipient_id), socket)
  end
  
  def update(data)
    data = data.deep_transform_keys! { |key| key.underscore }
    target_message = Message.find_by(id: data[:id]) 
    message = target_message.update(data["message"])
    debugger
    socket = { message: message.attributes.deep_transform_keys! { |key| key.camelize(:lower) }, action: "UPDATE" }
    ChatChannel.broadcast_to(find_convo(message.recipient_id), socket)
  end

  def remove(data)
    data = data.deep_transform_keys! { |key| key.underscore }
    target_message = Message.find_by(id: data[:id])
    target_message.destroy
    socket = { messageId: data.id, action: "REMOVE" }
    ChatChannel.broadcast_to(find_convo(data.recipient_id), socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  private
    def find_convo(convo_id)
      Conversation.find_by(id: convo_id)
    end
end
