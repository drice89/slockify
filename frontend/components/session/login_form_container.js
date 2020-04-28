import { login } from "../../actions/session_actions";
import { connect } from "react-redux";
import SessionForm from "./session_form";

const mapStateToProps = (state) => ({
  errors: state.errors.session,
  formType: 'Log In',
  path: 'login'
});

const mapDispatchToProps = (dispatch) => ({
  action: (user) => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
