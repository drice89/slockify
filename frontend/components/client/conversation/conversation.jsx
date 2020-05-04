import React from "react";
import MessageForm from "./message_form";
import { Link } from "react-router-dom";

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    }
    debugger
    this.bottom = React.createRef();
  }

  componentDidMount() {
    App.cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received: data => {
          this.setState({
            messages: this.state.messages.concat(data.message)
          });
        },
        speak: function (data) {
          return this.perform("speak", data);
        }
      }
    );
  }

  componentDidUpdate() {
    this.bottom.current.scrollIntoView();
  }

  render() {
    const messageList = this.state.messages.map(message => {
      return (
        <li key={message.id}>
          {message.body}
          <div ref={this.bottom} />
        </li>
      );
    });
    return (
      <div className="chatroom-container">
        <div>ChatRoom</div>
        <Link to="/">home</Link>
        <Link to="/chat/1">HIP hop</Link>
        <div className="message-list">{messageList}</div>
        <MessageForm />
      </div>
    );
  }
}

export default Conversation;