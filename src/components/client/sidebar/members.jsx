import React from "react"
import { openModal } from "../../../actions/ui_actions"
import { connect } from "react-redux"

const mapDispatchToProps = (dispatch) => ({
  openModal: (component) => dispatch(openModal(component))
})

const Members = ({users, activeTab, openModal, conversation}) => {
  return (
    <div className={activeTab === "members" ? "members-section" : "hidden"}>
      { conversation.memberIds.map(id => (
        <div key={users[id].fullName}>
          <span><img src={users[id].avatarUrl || window.defaultAvatarUrl}></img></span>
          <span>{users[id].displayName || users[id].fullName}</span>
        </div>
      ))}
      <div><button onClick={() => openModal("members")}>Add Member</button></div>
    </div>
)}

export default connect(null, mapDispatchToProps)(Members)