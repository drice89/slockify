import React from "react";
import MessageForm from "./message_form"

class Conversation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {messages: []};
    this.bottom = React.createRef();
  }

  componentDidMount(){
    App.cable.subscriptions.create(
      { channel: "ChatChannel", id: 1},
      { 
        received: data => { 
          this.setState({
            messages: this.messages.concat(data.message)
          });
        },
        speak: function(data) {
          return this.perform('speak', data);
        }
      }
    );
  }

  componentDidUpdate () {
    debugger
    //what is .current?
    this.bottom.current.scrollIntoView()
  }

  render () {
    const messageList = this.state.messages.map(message => {
      return (
        <li key={`${message.id}m`}>
          {message}
          <div ref={this.bottom} />
        </li>
      )
    });

    return (
      <div className="conversation-container" >
        <div>Conversation Title</div>
        <div className="message-list" >{messageList}</div>
        <MessageForm />
      </div>
    );
  }

}

export default Conversation

