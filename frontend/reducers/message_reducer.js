import { RECEIVE_CONVERSATION } from "../actions/conversation_actions";

const messageReducer = (state = {}, action) => (
  Object.freeze(state);
  let nextState = Object.assign({}, state );
  switch(action.type) {
    case RECEIVE_CONVERSATION:
      
  }
)