import React from "react"
import { messageSelector, userSelector } from "../../../reducers/selector";
import { connect } from "react-redux";
import MessageForm from "./message_form";
import ConversationHeader from "./conversation_header";
import MessageContainer from "./message_container";


const mapStateToProps = (state, ownProps) => {
  const historyLocation = ownProps.history.location.pathname.split("/");
  const conversationId = ownProps.match.params.conversationId || historyLocation[historyLocation.length-1];
  return {
    messages: messageSelector(state.entities.messages, state.entities.conversations[conversationId]),
    users: state.entities.users,
    currentUser: state.entities.users[state.session.id],
    conversationId: conversationId,
    conversation: state.entities.conversations[conversationId]
    };
};


class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.bottom = React.createRef();
  }


  componentDidUpdate() {
    this.bottom.current.scrollIntoView();
  }

  render() {
    const messageList = this.props.messages.map(message => {
      return (
        <li key={`${message.id}message`}>
          <MessageContainer message={message} conversationUsers={this.props.users}/>
          <div ref={this.bottom} />
        </li>
      );
    });
    return (
      <div className="chatroom-container">
        <div>
          <ConversationHeader conversation={this.props.conversation} />
        </div>
        <div>
          {messageList}
        </div>
        <div className="message-list">{messageList}</div>
        <MessageForm currentUserId={this.props.currentUser.id} conversationId={this.props.conversationId} />
      </div>
    );
  }
}


export default connect(mapStateToProps)(Conversation);
