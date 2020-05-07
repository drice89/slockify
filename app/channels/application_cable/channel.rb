module ApplicationCable
  class Channel < ActionCable::Channel::Base

    private
    def find_convo(convo_id)
      Conversation.find_by(id: convo_id)
    end
  end
end
