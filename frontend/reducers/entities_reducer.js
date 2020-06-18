import usersReducer from "./users_reducer";
import { combineReducers } from "redux";
import messagesReducer from "./messages_reducer";
import conversationsReducer from "./conversations_reducer";
import channelsReducer from "./channels_reducer";



const entitiesReducer = combineReducers({
  users: usersReducer,
  conversations: conversationsReducer,
  messages: messagesReducer,
  channels: channelsReducer
});

export default entitiesReducer;