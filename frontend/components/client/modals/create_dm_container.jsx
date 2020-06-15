import React, { useState } from "react"
import { closeModal } from "../../../actions/ui_actions"
import { connect } from "react-redux"
import UserListItem from "./user_list_item"
import { transformConversationNames, transformUserNames } from "../../../reducers/selector"


const mapStateToProps = (state) => ({
  users: transformUserNames(state.entities.users),
  currentUser: state.entities.users[state.session.id],
  conversations: transformConversationNames(state.entities.conversations, state.entities.users, state.session.id)
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
})

const CreateDmContainer = ({closeModal, users, currentUser, conversations}) => {
  //debugger
  const [channelName, setName] = useState("")
  const [selectedUsers, selectUsers] = useState({})
  //const [displayConversations, setDisplayConversations] = useState({})

  // useEffect(() => {
  //   setDisplayConversations(displayedConvos())
  // }, [])

  const displayedConvos = () => {
    let temp = {}
    Object.keys(conversations).forEach((convo) => {
      temp[convo.toString()] = conversations[convo]
    })

    Object.keys(users).forEach((user) => {
      if (!temp[user.toString()]) {
        temp[user.toString()] = users[user]
      }
    })
    debugger
    return temp
  }

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
  const list = Object.keys(displayedConvos()).map((convo) => {
    return (
      <li key={`${convo}`}>
        <UserListItem conversation={convo} name={convo} addUser={addUser} key={`${convo}userItem`}/>
      </li>
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
            <button onClick={() => createNewConversation(channelName, selectedUsers)}>
              Go
            </button>
          </li>
        </ul>
      </div>
      <div className = "modal-user-list">
        <h3>Users</h3>
        { list }
        {/* { !Object.keys(displayConversations).length ? null : list } */}
      </div>
      <div>
        
      </div>
    </div>
  )

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDmContainer)