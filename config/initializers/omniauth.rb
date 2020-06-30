require 'rspotify/oauth'

client_secret = ENV["RAILS_ENV"] == "production" ? ENV["CLIENT_SECRET"] : SpotifyCredentialsDev::CLIENT_SECRET
client_id = ENV["RAILS_ENV"] == "production" ? ENV["CLIENT_ID"] : SpotifyCredentialsDev::CLIENT_ID


Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, client_id, client_secret, scope: 'user-read-email playlist-modify-public playlist-modify-private user-library-read user-library-modify'
end