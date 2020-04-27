import * as APIUtil from "../util/api_util"
const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
const RECEIVE_ERRORS = "RECEIVE_ERRORS";

const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const signup = user => dispatch => (
  APIUtil.signup(user)
    .then( res => dispatch(receiveCurrentUser(res)))
);

export const logout = () => dispatch => (
  APIUtil.logout()
    .then( res => dispatch(logoutCurrentUser))
);

export const login = (user) => dispatch => (
  APIUtil.login(user)
    .then(res => dispatch(receiveCurrentUser(res)))
);
  
