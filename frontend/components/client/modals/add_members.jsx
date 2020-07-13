import React, {useState} from "react";
import { connect } from "react-redux";
import { closeModal } from "../../../actions/ui_actions";
import { withRouter } from "react-router-dom"


const mapStateToProps = (state, ownProps) => {
  return {
  users: state.entities.users,
  conversation: state.entities.conversations[ownProps.match.params.conversationId]
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
})


const AddMembers = ({users, conversation, closeModal}) => {
  const [members, setMembers] = useState({})
  const [user, setUser] = useState("")
  const [filteredUsers, setFilteredUsers] = useState({})
  
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

  const selectedUsers = Object.values(members).map((member) => {
      return (
        <span key={member.displayName}>
          {member.displayName || member.fullName}
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

  const addNewMembers = () => {
    let data = { conversation, members }
    data['requestType'] = "add member"
    App.cable.subscriptions.subscriptions[0].editConversation(data)
    closeModal()
  } 

  return (
    <div className="add-users-modal">
      <div>
        <h1>Add People</h1>
        <h5>{`# ${conversation.name}`}</h5>
      </div>
      <div>{ selectedUsers }</div>
      <div>
        <input type="text" placeholder="name or username" value={user} onChange={e => handleChange(e)} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddMembers))