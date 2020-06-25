import React from "react"

const Playlist = ({playlistUrl, activeTab}) => (
  <div>
    <iframe src={`https://open.spotify.com/embed/playlist/${playlistUrl}`} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  </div>
)

export default Playlist