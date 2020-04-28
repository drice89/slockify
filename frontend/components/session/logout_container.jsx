import React from "react";
import { logout } from "../../actions/session_actions";
import { connect } from "react-redux";

const LogoutButton = ({session, logout}) => (
  <div>
    {
      session ? <button onClick={()=> logout()}>Log out</button> : <span></span>
    }
  </div>
)

const mstp = (state) => ({
  session: state.session.id
})

const mdtp = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(mstp, mdtp)(LogoutButton)

