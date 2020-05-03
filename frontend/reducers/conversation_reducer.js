import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const conversationsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.user.conversations;
    default:
      return state;
  }
};

export default conversationsReducer;