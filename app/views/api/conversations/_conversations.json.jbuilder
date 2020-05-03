conversations.each do |conversation|
  josn.set! conversation.id do
    json.partial! "api/conversations/conversation", conversation: conversation
  end
end