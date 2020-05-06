import React from "react"
import { messageSelector } from "../../../reducers/selector";
import { connect } from "react-redux";
import MessageForm from "./message_form";
import ConversationHeader from "./conversation_header";
import MessageContainer from "./message_container";
import { receiveMessage, removeMessage } from "../../../actions/message_actions";


const mapStateToProps = (state, ownProps) => {
  const historyLocation = ownProps.history.location.pathname.split("/");
  const conversationId = ownProps.match.params.conversationId || historyLocation[historyLocation.length-1];
  return {
    messages: messageSelector(state.entities.messages, state.entities.conversations[conversationId]),
    users: state.entities.users,
    currentUserId: state.session.id,
    conversation: state.entities.conversations[conversationId]
    };
};

const mapDispatchToProps = (dispatch) => ({
  editMessage: message => dispatch(receiveMessage(message)),
  deleteMessage: message => dispatch(removeMessage(message))
});


class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.bottom = React.createRef();
    console.log(this.props.messages);
  }


  componentDidUpdate() {
    this.bottom.current.scrollIntoView();
  }

  render() {
    const messageList = this.props.messages.map((message, i) => {
      return (
        <li key={`${i}message`}>
          <MessageContainer 
              message={message} 
              conversationUsers={this.props.users} 
              currentUserId={this.props.currentUserId}
              editMessage={this.props.editMessage}
              deleteMessage={this.props.deleteMessage}
              conversationId={this.props.conversation.id}
          />
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
        <MessageForm currentUserId={this.props.currentUserId} conversationId={this.props.conversation.id} />
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
