

RSpotify::User.class_eval do
  def create_playlist_two!(name, description)
      url = "users/#{@id}/playlists"
      request_data = { name: name, public: false, description: description, collaborative: true }.to_json

      response = RSpotify::User.oauth_post(@id, url, request_data)
      return response if RSpotify.raw_response
      RSpotify::Playlist.new response
    end
end