class AddSpotifyToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :spotify_user_info, :string
  end
end
