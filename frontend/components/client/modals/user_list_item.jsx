import React from "react"


const UserListItem = ({conversation, addUser, name, users, currentUserId}) => {
  const memberships = (conversation) => {
    if (conversation.convoType) {
      return conversation.memberIds
    } 
    return [conversation.id]
  }

  const selectAvatar = (userIds) => {
    let defaultAvatar = window.defaultAvatarUrl
    let groupAvatar = window.groupAvatarUrl
    
    if (userIds.length > 2) {
      return groupAvatar
    }

    for(let user of userIds) {
      if (user !== currentUserId) {
        return users[user].avatarUrl || defaultAvatar
      }
    }

    return defaultAvatar
  }

  const clickUserItem = () => document.getElementById(`user-${conversation.id}-item`).click()

  return(
  <div className="user-list-item" onClick={clickUserItem}>
    <div className="user-list-checkbox"><input id={`user-${conversation.id}-item`} type="checkbox" onChange={addUser(memberships(conversation))}/></div>
    <div><img src={selectAvatar(memberships(conversation))} alt=""/></div>
    <div>
      <div>
        {name}
      </div>
        {conversation.lastMessage ? conversation.lastMessage.body : ""}
    </div>
  </div>
)}

export default UserListItem