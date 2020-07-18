import React from "react"

const Playlist = ({playlistUrl, activeTab}) => (
  <div className={ activeTab === "playlist" ? "playlist" : "hidden"}>
    <iframe src={`https://open.spotify.com/embed/playlist/${playlistUrl}`} width="340" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    <span>
      <p>
        To add a song type <span>"/add_song [spotify track uri here]"</span> in the message box and send.
        <span> ex. "/add_song 5UKj2UGT4AMc1GMLk5S5sw"</span> would add "Fall In Love" by Phantogram.
      </p>
    </span>
  </div>
)

export default Playlist