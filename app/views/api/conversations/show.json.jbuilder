json.extract! @conversation, :id, :name, :description, :owner_id, :is_private, :playlist_url, :restricted_playlist?, :convo_type, :message_id

@messages.each do |message|
  message.set! message.id do
    json.extract! message, :body, :author_id, :recipient_id
  end
end
