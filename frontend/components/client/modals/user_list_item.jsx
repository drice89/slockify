import React from "react"


const UserListItem = ({conversation, addUser, name}) => {
  const memberships = (conversation) => {
    if (conversation.convoType) {
      return conversation.memberIds
    } 
    return [conversation.id]
  }

  return(
  <div className="user-list-item">
    <div><input type="checkbox" onChange={addUser(memberships(conversation))}/></div>
    <div><img src={conversation.avatarUrls || window.defaultAvatarUrl} alt=""/></div>
    <div>
      <div>
        {name}
      </div>
        {conversation.lastMessage ? conversation.lastMessage.body : ""}
    </div>
  </div>
)}

export default UserListItem