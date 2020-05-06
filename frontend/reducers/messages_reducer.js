import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_MESSAGE, REMOVE_MESSAGE, RECEIVE_EDIT } from "../actions/message_actions";

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state );
  
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return action.user.messages;
//I tried to have "RECEIVE_MESSAGE || RECEIVE_EDIT" and it wasnt hitting the RECEIVE_EDIT CONDITION so I broke it out
    case RECEIVE_MESSAGE:
      nextState[action.message.id] = action.message;
      return nextState;
    case RECEIVE_EDIT:
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