import { combineReducers } from "redux";
import sessionErrorsReducer from "./session_errors_reducer";
import conversationErrorsReducer from  "./conversation_errors_reducer";
import messageErrorsReducer from "./message_errors_reducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  conversations: conversationErrorsReducer,
  messages: messageErrorsReducer
});

export default errorsReducer;