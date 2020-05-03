import usersReducer from "./users_reducer";
import { combineReducers } from "redux";
import messagesReducer from "./messages_reducer";
import conversationsReducer from "./conversations_reducer";



const entitiesReducer = combineReducers({
  users: usersReducer,
  conversations: conversationsReducer,
  messages: messagesReducer
});

export default entitiesReducer;