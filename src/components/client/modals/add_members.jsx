import React, {useState, useRef} from "react";
import { connect } from "react-redux";
import { closeModal } from "../../../actions/ui_actions";
import { useParams } from "react-router-dom";


const mapStateToProps = (state, ownProps) => {
  const { conversationId } = useParams()

  return {
  currentUserId: state.session.id,
  users: state.entities.users,
  conversation: state.entities.conversations[conversationId]
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
})


const AddMembers = ({users, conversation, closeModal, currentUserId}) => {
  const [members, setMembers] = useState({})
  const [user, setUser] = useState("")
  const [filteredUsers, setFilteredUsers] = useState({})
  const textInput = useRef(null);
  
  const handleChange = (e) => {
    const userName = e.currentTarget.value
    setUser(userName)
    let searchedUserCollector = {}
    Object.values(users).forEach((user) => {

      if ((user.fullName && user.fullName.toLowerCase().includes(userName.toLowerCase())) || (user.displayName && user.displayName.toLowerCase().includes(userName.toLowerCase()))) {
        searchedUserCollector[user.id] = user
      }
    setFilteredUsers(searchedUserCollector)
    }) 
  }

  const removeUser = (memberId) => {
    const nextState = members
    delete nextState[memberId]
    setMembers({...nextState})
  }

  const selectedUsers = Object.values(members).map((member) => {
      return (
        <span className="selected-user-box" key={member.displayName}>
          {member.displayName || member.fullName}
          <span onClick={ () => removeUser(member.id)}>
            <i className="fa fa-times-circle-o" aria-hidden="true"></i>
          </span>
        </span>
      )
    })

  const handleClick = (user) => {
    let membersToAdd = { ...members }
    membersToAdd[user.id] = user
    if (!conversation.memberIds.includes(user.id)) setMembers(membersToAdd)
    setUser("")
    setFilteredUsers({})
  }

  const clickInput = () => {
     textInput.current.focus();
  }

  const addNewMembers = () => {
    let data = { conversation, members }
    data['requestType'] = "add member"
    App.cable.subscriptions.subscriptions[0].editConversation(data)
    closeModal()
  } 

  const conversationName = () => {
    if (conversation.convoType === "channel") {
      return `# ${conversation.name}`
    } else {
      const nameArray = conversation.memberIds
      return nameArray.map((id) => {
        if (id !== currentUserId) {
          return users[id].displayName || users[id].fullName
          }
          return " "
        })
        .join(", ")
        .replace(/\s,\s/ig, "")
        .trim()
    }
  }

  return (
    <div className="add-users-modal">
      <div>
        <h1>Add People</h1>
        <h5>{conversationName()}</h5>
      </div>
      <div id="add-users-input" className="modal-user-select-input" onClick={clickInput}>
        { selectedUsers }
        <input ref={textInput} type="text" value={user} onChange={e => handleChange(e)} />
          <ul className={"select-members-dropdown"}>
              {
                Object.values(filteredUsers).map(user => (
                    <li key={`${user.id}filtered`} onClick={ () => handleClick(user)}>
                      <span>{user.fullName}</span>
                      <span>{user.displayName}</span>
                      <span>{conversation.memberIds.includes(user.id) ? "Already in channel" : ""}</span>
                    </li>
                  )
                )
              }
          </ul>
      </div>
      <div className="modal-button-container">
        <button onClick={() => addNewMembers()}>Add</button>
      </div>
    </div>
  )
} 

export default connect(mapStateToProps, mapDispatchToProps)(AddMembers)