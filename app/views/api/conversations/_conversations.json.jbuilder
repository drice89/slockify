conversations.each do |conversation|
  josn.set! conversation.id do
    json.extract! conversation, :id, :name, :is_private, :convo_type
  end
end