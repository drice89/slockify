
import { RECEIVE_MESSAGES, RECEIVE_MESSAGE, REMOVE_MESSAGE, RECEIVE_EDIT } from "../actions/message_actions";

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state );
  
  switch(action.type) {
    case RECEIVE_MESSAGES:
      return action.messages;
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