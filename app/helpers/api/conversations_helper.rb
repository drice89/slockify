module Api::ConversationsHelper
    def self.create_playlist(conversation)
        @credentials = User.find(1).spotify_user_info
        return unless @credentials.present?
        @master_spotify_user = RSpotify::User.new(JSON.parse(@credentials))
        #create_playlist_with_options! is monkey patched in config/initializers/overrides.rb
        @master_spotify_user.create_playlist_two!(conversation["name"], conversation["description"])
    end
end
