import { messageSelector, userSelector } from "../../../reducers/selector";
import { receiveMessage, removeMessage } from "../../../actions/message_actions";
import Conversation from "./conversation";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
  messages: messageSelector(state.entities.messages, state.entities.conversations[ownProps.match.params.conversationId]),
  users: userSelector(state.entities.users, state.entities.conversations[ownProps.match.params.conversationId]),
  currentUser: state.entities.users[state.session.id]
  }
};

const mapDispatchToProps = (dispatch) => ({
  receiveMessage: message => dispatch(receiveMessage(message)),
  removeMessage: messageId => dispatch(removeMessage(messageId)) 
});


export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
