import { messageSelector, userSelector } from "../../../reducers/selector";
import Conversation from "./conversation";
import { connect } from "react-redux";


const mapStateToProps = (state, ownProps) => {
  const historyLocation = ownProps.history.location.pathname.split("/");
  const conversationId = ownProps.match.params.conversationId || historyLocation[historyLocation.length-1];
  return {
    messages: messageSelector(state.entities.messages, state.entities.conversations[conversationId]),
    users: userSelector(state.entities.users, state.entities.conversations[conversationId]),
    currentUser: state.entities.users[state.session.id],
    conversationId: conversationId
    };
};



export default connect(mapStateToProps)(Conversation);
