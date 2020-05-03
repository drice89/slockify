##curently the this is sending back the id and the preloaded state session is getting picked up there. You can refactor to the store
#and the login (entry.js) to ensure that the session id is DRY - will optimize late

user = user
conversations = user.conversations.includes(:messages, :members)

json.extract! user, :id 

conversations.each do |conversation|
  json.set! "users" do
    json.set! user.id do
      json.extract! user, :id, :email, :full_name, :display_name, :status, :avatar_url, :title, :description, :conversation_ids
    end
    conversation.members.each do |member|
      json.set! member.id do
        json.extract! member, :id, :full_name, :display_name, :status, :avatar_url, :title, :description
      end
    end
  end


  json.set! "conversations" do
    json.set! conversation.id do
      json.partial! "api/conversations/conversation", conversation: conversation
    end
  end

  json.set! "messages" do
    conversation.messages.each do |message|
      json.set! message.id do
        json.partial! '/api/messages/message', message: message
      end
    end
  end

  json.set! "users" do
    conversation.members.each do |member|
      json.set! member.id do
        json.extract! member, :full_name, :avatar_url, :display_name
      end
    end
  end
end 
