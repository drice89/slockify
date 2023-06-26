import * as userAPIUtils from "../util/user_api_util"

export const CHANGE_USER_STATUS = "CHANGE_USER_STATUS";
export const RECEIVE_USERS = "RECEIVE_USERS"

export const changeUserStatus = (user) => ({
  type: CHANGE_USER_STATUS,
  user
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
})

export const getAllUsers = () => (dispatch) => (
  userAPIUtils.fetchAllUsers()
    .then(res => dispatch(receiveUsers(res)))
)