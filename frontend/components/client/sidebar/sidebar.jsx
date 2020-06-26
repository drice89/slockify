import React, {useEffect, useState} from 'react';
import Playlist from './playlist'
import Members from './members'
import About from './about'

const Sidebar = ({conversation, users, currentUserId}) => {
  const convoType = conversation.convoType
  const [activeTab, setActiveTab] = useState("")
  useEffect(() => {
    setActiveTab(convoType)
  }, [])
  const descriptionOrUser = (usersList) => {
    if (convoType === "channel") {
      return conversation
    }

    let dmUser = {} 
    conversation.memberIds.forEach(id => {
      if(id !== currentUserId && convoType === "direct") dmUser = {...usersList[id]}
    })
    return dmUser
  }
  const playlist = { name: "Playlist", component: <Playlist playlistUrl={conversation.playlistUrl} activeTab={activeTab}/> }
  const members = { name: "Members", component: <Members users={users} activeTab={activeTab} conversation={conversation}/>}
  const about = { name: "About", component: <About description={ descriptionOrUser(users) } activeTab={activeTab} /> }
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
        { convoType !== "channel" ? "" : (<li onClick={() => setActiveTab("playlist")}>{sect(playlist)}</li>) }
        { convoType === "group" ? "" : (<li onClick={() => setActiveTab("about")}>{ sect(about) }</li>) }
        { convoType === "direct" ? "" : (<li onClick={() => setActiveTab("members")}>{ sect(members) }</li>) }
      </ul>
    </div>
  )
} 

export default Sidebar