import { RECEIVE_CURRENT_USER } from "../actions/session_actions"
import { CHANGE_USER_STATUS, RECEIVE_USERS } from "../actions/user_actions";
import { RECEIVE_CONVERSATION, REMOVE_CONVERSATION } from "../actions/conversation_actions";

//receive conversation is super hacky - going to need to refactor to deal with the session
const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.user.users;
    case CHANGE_USER_STATUS:
      if (nextState[action.user.id]) {
        nextState[action.user.id].status = action.user.status;
      }
        return nextState;
    case RECEIVE_CONVERSATION:
      //this is bad - see line 75 of client jsx. Im adding a session id so i can index the current user
      nextState[action.payload.sessionId].conversationIds.push(action.payload.conversation.id);
      return nextState;
    case REMOVE_CONVERSATION:
      let targetIndex = nextState[action.payload.sessionId].conversationIds.indexOf(action.payload.conversation.id);
      nextState[action.payload.sessionId].conversationIds.splice(targetIndex, 1);
      return nextState;
    case RECEIVE_USERS:
      return action.users
    default:
      return state;
  }
};

export default usersReducer;
