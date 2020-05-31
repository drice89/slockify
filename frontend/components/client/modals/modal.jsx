import React from "react"
import { closeModal } from "../../../actions/ui_actions"
import { connect } from "react-redux"
import CreateDmContainer from "./create_dm_container"

const mapStateToProps = (state) => ({
  modal: state.ui.modal
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
})

const Modal = ({modal, closeModal}) => {
  if (!modal) return null;
  let component;
  switch(modal) {
    case "dm":
      component = <CreateDmContainer />
      break;
    default:
      return null;
  }

  return(
    <div className="modal-bg" onClick={closeModal}>
      <div className="modal-component-container" onClick={(e) => e.stopPropagation()} >
        { component }
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)

