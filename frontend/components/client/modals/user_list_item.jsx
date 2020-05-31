import React from "react"


const UserListItem = ({user, addUser}) => {

  return(

  <div className="user-list-item">
    <div><input type="checkbox" onChange={addUser(user.id)}/></div>
    <div><img src={user.avatarUrl || window.defaultAvatarUrl} alt=""/></div>
    <div>{user.displayName ? user.displayName : user.fullName}</div>
  </div>
)}

export default UserListItem