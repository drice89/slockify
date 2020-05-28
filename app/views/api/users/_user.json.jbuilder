##NOTES FOR REFACTOR -they live here because the initial store state (this file) - is driving the need for refactor
#1. Get rid of members call for initial query - members should be sent up with the messages when the conversation view page is loaded
#  - if you get rid of the messages you can get rid of the ID that was a hacky way of associating the session with the user and get rid of that error
# - check where you set the current user to the window if you do this root.html.erb, root.jsx
#2. Dont call messages until the conversation initializes on the page. Messages should be sent up with a conversation show fetch
#3. Subscriptions to a channel need to then be closed when the component unmounts - very important


json.set! "session" do
  json.extract! user, :id
end

json.set! "users" do
  User.all.each do |other_user|
    json.set! other_user.id do
      json.extract! other_user, :id, :full_name, :display_name, :status, :avatar_url
    end
  end
  json.set! user.id do
    json.extract! user, :id, :email, :full_name, :display_name, :status, :avatar_url, :title, :description, :conversation_ids
  end
end

json.set! "conversations" do
  user.conversations.each do |conversation|
    json.set! conversation.id do
      json.partial! "api/conversations/conversation.json.jbuilder", conversation: conversation
    end
  end
end




#old code

# json.extract! user, :id 

# subbed_conversations = user.conversations.includes(:messages, :members)
# subbed_conversations.each do |conversation|
  
#   json.set! "users" do
#     json.set! user.id do
#       json.extract! user, :id, :email, :full_name, :display_name, :status, :avatar_url, :title, :description, :conversation_ids
#     end
#     conversation.members.each do |member|
#       json.set! member.id do
#         json.extract! member, :id, :full_name, :display_name, :status, :avatar_url, :title, :description
#       end
#     end
#   end


#   json.set! "conversations" do
#     json.set! conversation.id do
#       json.partial! "api/conversations/conversation.json.jbuilder", conversation: conversation
#     end
#   end

#   json.set! "messages" do
#     conversation.messages.each do |message|
#       json.set! message.id do
#         json.partial! '/api/messages/message.json.jbuilder', message: message
#       end
#     end
#   end
# end
