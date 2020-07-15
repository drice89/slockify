import React from "react"


const UserListItem = ({conversation, addUser, name}) => {
  const memberships = (conversation) => {
    if (conversation.convoType) {
      return conversation.memberIds
    } 
    return [conversation.id]
  }

  const clickUserItem = () => document.getElementById(`user-${conversation.id}-item`).click()

  return(
  <div className="user-list-item" onClick={clickUserItem}>
    <div className="user-list-checkbox"><input id={`user-${conversation.id}-item`} type="checkbox" onChange={addUser(memberships(conversation))}/></div>
    <div><img src={window.defaultAvatarUrl} alt=""/></div>
    <div>
      <div>
        {name}
      </div>
        {conversation.lastMessage ? conversation.lastMessage.body : ""}
    </div>
  </div>
)}

export default UserListItem