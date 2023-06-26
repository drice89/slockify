require 'rspotify/oauth'

client_secret = ENV["CLIENT_SECRET"]
client_id = ENV["CLIENT_ID"]

Rails.application.config.to_prepare do
  OmniAuth::Strategies::Spotify.include SpotifyOmniauthExtension
end 


Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, client_id, client_secret, scope: 'user-read-email playlist-modify-public playlist-modify-private user-library-read user-library-modify'
end