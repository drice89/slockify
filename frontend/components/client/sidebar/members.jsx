import React from "react"

const Members = ({users, activeTab}) => {
 
  return (
    <div>
      { Object.values(users).map(user => (
        <div key={user.full_name}>{user.displayName || user.full_name}</div>
      ))}
      <div><button>Add Member</button></div>
    </div>
)}

export default Members