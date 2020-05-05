import React from "react";
import MessageForm from "./message_form";

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
        <li key={message.id}>
          {message.body}
          <div ref={this.bottom} />
        </li>
      );
    });
    return (
      <div className="chatroom-container">
        <div>
          <ConversationHeader conversation={this.props.conversation} />
        </div>
        <div className="message-list">{messageList}</div>
        <MessageForm currentUserId={this.props.currentUser.id} conversationId={this.props.conversationId} />
      </div>
    );
  }
}

export default Conversation;