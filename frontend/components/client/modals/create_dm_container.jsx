import React, { useState, useEffect } from "react"
import { closeModal } from "../../../actions/ui_actions"
import { connect } from "react-redux"
import UserListItem from "./user_list_item"
import { transformConversationNames } from "../../../reducers/selector"


const mapStateToProps = (state) => ({
  users: state.entities.users,
  currentUser: state.entities.users[state.session.id],
  conversations: transformConversationNames(state.entities.conversations, state.entities.users, state.session.id)
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
})

const CreateDmContainer = ({closeModal, users, currentUser, conversations}) => {
  const [channelName, setName] = useState("")
  const [selectedUsers, selectUsers] = useState({})
  const [displayConversations, setDisplayConversations] = useState({})

  useEffect(() => {
    setDisplayConversations(displayedConvos())
  }, [setName, selectedUsers])

  const displayedConvos = () => {
    let temp = {}
    Object.keys(conversations).forEach((convo) => {
      temp[convo.toString()] = conversations[convo]
    })

    Object.values(users).forEach((user) => {
      const name = user.displayName || user.fullName
      if (!temp[name]) {
        temp[name] = user
      }
    })
    return temp
  }

  const addUser = (ids) => {
    return e => {
      if(e.currentTarget.checked) {
        let usersForLocalState = {}
        ids.forEach((id)=>{
          usersForLocalState[id] = users[id]
        })
        selectUsers({...selectedUsers, ...usersForLocalState})
      } else {
        let newState = {...selectedUsers}
        ids.forEach((id)=>{
          delete newState[id]
        })
        selectUsers({...newState})
      }
    }
  }

  const removeUser = (id) => {
    if (selectedUsers[id]) {
      const nextState = selectedUsers
      delete nextState[id]
      selectUsers({...nextState})
    }
  }

  const list = Object.keys(displayConversations).map((convo) => {
    return (
      <li key={`${convo}`}>
        <UserListItem conversation={displayConversations[convo]} users={users} name={convo} addUser={addUser} key={`${convo}userItem`}/>
      </li>
    )
  });

  const renderSelectedUsers = Object.values(selectedUsers).map((user) => {
    return (
      <span key={user.id} className="selected-user-box">
       {`${user.displayName || user.fullName} `}
        <span onClick={() => removeUser(user.id)}>
          <i class="fa fa-times-circle-o" aria-hidden="true"></i>
        </span>
      </span>
      
    )
  });

  const createNewConversation = (channelName, selectedUsers) => {
    const members = {...selectedUsers}
    members[currentUser.id] = currentUser
    const conversation = {
      name: channelName, 
      ownerId: currentUser.id, 
      convoType: Object.keys(selectedUsers).length > 2 ? "group" : "direct",
      "isPrivate?": true,
    }

    App.cable.subscriptions.subscriptions[0].createConversation({conversation, members});
    closeModal(); 
  }

  return (
    <div className="modal-body">
      <div>
        <h1>Direct Messages</h1>
      </div>
      <div>
        <ul className="modal-user-search">
          <li className="modal-user-select-input"> 
            { renderSelectedUsers }
            <span> 
              <input type="text" 
              onChange={(e) => setName(e.currentTarget.value)} 
              value={channelName}></input>
            </span>
          </li>
          <li>
            <button onClick={() => createNewConversation(channelName, selectedUsers)}>
              Go
            </button>
          </li>
        </ul>
      </div>
      <div className = "modal-user-list">
        <h3>Users</h3>
        { list }
      </div>
      <div>
        
      </div>
    </div>
  )

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDmContainer)