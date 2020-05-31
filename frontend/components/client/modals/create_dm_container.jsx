import React, { useState } from "react"
import { closeModal } from "../../../actions/ui_actions"
import { connect } from "react-redux"
import UserListItem from "./user_list_item"


const mapStateToProps = (state) => ({
  users: state.entities.users,
  currentUser: state.entities.users[state.session.id]
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
})

const CreateDmContainer = ({closeModal, users, currentUser}) => {
  const [channelName, setName] = useState("")
  const [selectedUsers, selectUsers] = useState({})
  const addUser = (userId) => {
    return e => {
      if(e.currentTarget.checked) {
        selectUsers({...selectedUsers, [userId]: users[userId]})
      } else {
        let newState = {...selectedUsers}
        delete newState[userId]
        selectUsers({...newState})
      }
    }
  }
  const userList = Object.values(users).map((user) => {
    return (
      <li key={`${user.id}user`}>
        <UserListItem user = {user} addUser={addUser} key={`${user.id}userItem`}/>
      </li>
    )
  });
  const createMessage = (channelName, selectedUsers) => {
    const members = {...selectedUsers}
    members[currentUser.id] = currentUser
    const conversation = {
      name: channelName, 
      ownerId: currentUser.id, 
      convoType: Object.keys(selectedUsers).length > 2 ? "group" : "direct",

    }
    App.cable.subscriptions.subscriptions[0].createConversation({conversation, members});
    closeModal(); 
  }

  return (
    <div className="modal-body">
      <div>
        <h2>Direct Messages</h2>
      </div>
      <div>
        <ul className="modal-user-search">
          <li>
            <input placeholder="Find or start a conversation" 
            onChange={(e) => setName(e.currentTarget.value)} 
            value={channelName}
            size="52" >
            </input>
          </li>
          <li>
            <button onClick={() => createMessage(channelName, selectedUsers)}>
              Go
            </button>
          </li>
        </ul>
      </div>
      <div className = "modal-user-list">
        <h3>Users</h3>
        {userList}
      </div>
      <div>
        
      </div>
    </div>
  )

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDmContainer)