 
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_CONVERSATION, RECEIVE_CONVERSATIONS, REMOVE_CONVERSATION, RECEIVE_EDITED_CONVERSATION } from "../actions/conversation_actions";
//import { RECEIVE_MESSAGE, REMOVE_MESSAGE } from "../actions/message_actions";

const conversationsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.user.conversations;
    case RECEIVE_CONVERSATION:
      debugger
      nextState[action.payload.conversation.id] = action.payload.conversation;
      return nextState;
    case RECEIVE_EDITED_CONVERSATION:
      nextState[action.payload.conversation.id] = action.conversation;
      return nextState;
    case RECEIVE_CONVERSATIONS:
      return action.conversations;
    case REMOVE_CONVERSATION:
      delete nextState[action.conversationId];
      return nextState;
    // case RECEIVE_MESSAGE:
    //   nextState[action.message.recipientId].messageIds.push(action.message.id);
    //   return nextState;
    // case REMOVE_MESSAGE:
    //   //questionable efficacy here
    //   let targetIndex = nextState[action.message.recipientId].messageIds.indexOf(action.message.id);
    //   nextState[action.message.recipientId].messageIds.splice(targetIndex,1);
    //   return nextState;
    default:
      return state;
  }
};

export default conversationsReducer;