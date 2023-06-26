import { RECEIVE_CHANNELS, CLEAR_CHANNELS } from "../actions/conversation_actions";

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return action.channels;
    case CLEAR_CHANNELS:
      return {}
    default:
      return state;
  }
};

export default channelsReducer;