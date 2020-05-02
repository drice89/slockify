json.set! "conversation" do
  json.extract! @conversation, 
    :id, :name, :description, :owner_id, :is_private?, :playlist_url, :restricted_playlist?, :convo_type, :message_ids
end

json.set! "messages" do
  @messages.each do |message|
    json.set! message.id do
      json.extract! message, :body, :author_id, :recipient_id
    end
  end
end


