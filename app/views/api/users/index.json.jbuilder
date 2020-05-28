@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :full_name, :display_name, :status, :avatar_url
  end
end