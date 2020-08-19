import React, {useEffect, useState} from 'react';
import Playlist from './playlist'
import Members from './members'
import About from './about'

const Sidebar = ({conversation, users, currentUserId}) => {
  const convoType = conversation.convoType
  const [activeTab, setActiveTab] = useState("")
  useEffect(() => {
    let tab = convoType === "channel" ? "playlist" : convoType === "direct" ? "about" : "members"; 
    setActiveTab(tab)
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
      <div className="sidebar-header" onClick={() => {activeTab === obj.name.toLowerCase() ? setActiveTab(null): ""}}>
        <h2>{obj.name}</h2>
        <span  className={activeTab === obj.name.toLowerCase() ? "rotate" : ""}><svg id="Capa_1" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="M367.954,213.588L160.67,5.872c-7.804-7.819-20.467-7.831-28.284-0.029c-7.819,7.802-7.832,20.465-0.03,28.284
			l207.299,207.731c7.798,7.798,7.798,20.486-0.015,28.299L132.356,477.873c-7.802,7.819-7.789,20.482,0.03,28.284
			c3.903,3.896,9.016,5.843,14.127,5.843c5.125,0,10.25-1.958,14.157-5.873l207.269-207.701
			C391.333,275.032,391.333,236.967,367.954,213.588z"/></g></svg></span>
      </div>
      {obj.component}
    </div>
  )

  return (
    <div className="sidebar-main">
      <ul>
        { convoType !== "channel" ? "" : (<li onClick={() => activeTab !== "playlist" ? setActiveTab("playlist") : ""}>{sect(playlist)}</li>) }
        { convoType === "group" ? "" : (<li onClick={() => activeTab !== "about" ? setActiveTab("about"):  ""}>{ sect(about) }</li>) }
        { convoType === "direct" ? "" : (<li onClick={() => activeTab !== "members" ? setActiveTab("members"):  ""}>{ sect(members) }</li>) }
      </ul>
    </div>
  )
} 

export default Sidebar