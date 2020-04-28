import { connect } from "react-redux";
import SessionForm from "./session_form";
import { signup } from "../../actions/session_actions";

const mapStateToProps = (state) => ({
  errors: state.errors.session,
  formType: 'Sign Up',
  path: "signup"
});

const mapDispatchToProps = (dispatch) => ({
  action: (user) => dispatch(signup(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);