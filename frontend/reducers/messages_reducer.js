import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_MESSAGE, REMOVE_MESSAGE } from "../actions/message_actions";

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state );
  
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return action.user.messages;
    case RECEIVE_MESSAGE:
      nextState[action.message.id] = action.message;
      return nextState;
    case REMOVE_MESSAGE:
      delete nextState[action.message.id];
      return nextState;
    default:
      return state;
  }
};

export default messagesReducer;