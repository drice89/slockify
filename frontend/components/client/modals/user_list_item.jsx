import React from "react"


const UserListItem = ({conversation, addUser, name}) => {

  return(

  <div className="user-list-item">
    <div><input type="checkbox" onChange={addUser(conversation)}/></div>
    <div><img src={conversation.avatarUrl || window.defaultAvatarUrl} alt=""/></div>
    <div>{name}</div>
  </div>
)}

export default UserListItem