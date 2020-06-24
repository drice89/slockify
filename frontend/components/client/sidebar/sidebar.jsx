import React from 'react';
import Playlist from './playlist'
import Members from './members'
import About from './about'

const Sidebar = ({conversation, users}) => {
  const playlist = { name: "Playlist", component: <Playlist playlistUrl={conversation.playlistUrl}/> }
  const members = { name: "Members", compnent: <Members users={users}/>}
  const about = { name: "About", component: <About descrption={conversation.description || null }/> }
  const sect = (obj) => (
    <div>
      <div>
        <h2>{obj.name}</h2>
        <span>V</span>
      </div>
      {obj.component}
    </div>
  )

  return (
    <div>
      <ul>
        <li>{ sect(playlist) }</li>
        <li>{ sect(about) }</li>
        <li>{ sect(members) }</li>
      </ul>
    </div>
  )
} 

export default Sidebar