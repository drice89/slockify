require 'rspotify/oauth'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, SpotifyCredentialsDev::CLIENT_ID, SpotifyCredentialsDev::CLIENT_SECRET, scope: 'user-read-email playlist-modify-public user-library-read user-library-modify'
end