import React from "react"
import { openModal } from "../../../actions/ui_actions"
import { connect } from "react-redux"

const mapDispatchToProps = (dispatch) => ({
  openModal: (component) => dispatch(openModal(component))
})

const Members = ({users, activeTab, openModal, conversation}) => {
  return (
    <div className={activeTab === "members" || activeTab === "group" ? "" : "hidden"}>
      { conversation.memberIds.map(id => (
        <div key={users[id].fullName}>{users[id].displayName || users[id].fullName}</div>
      ))}
      <div><button onClick={() => openModal("members")}>Add Member</button></div>
    </div>
)}

export default connect(null, mapDispatchToProps)(Members)