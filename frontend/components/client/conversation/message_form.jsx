import React from "react";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    //DO NOT LEAVE HARD CODED!!!!!!!!!!!
    //!!!!!!!
    //IM MR MEESEEKS LOOK AT ME 
    this.state = {
      body: "",
      authorId: this.props.currentUserId,
      recipientId: this.props.conversationId
    };
  }
  update(field) {
    return e =>
      this.setState({ [field]: e.currentTarget.value });
  }

  pressEnterToSend(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e)
    }
  }

  handleSubmit(e) {
    e.preventDefault();
     //look at subscriptions array when there are multiple subscriptions
     //the first subscription is to master and that DOES NOT have the speak function
     //so we index into the second subscription and it makes things work.
     //this may need to be refactored when we have the subscriptions on demand
    App.cable.subscriptions.subscriptions[1].speak({ message: this.state });
    this.setState({ body: "" });
  }

  render() {
    return (
      <div className="message-form-container">
        <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="text-area-wrapper">
          <textarea
            className="message-form-text-area"
            value={this.state.body}
            onChange={this.update("body")}
            placeholder="Type message here"
            onKeyDown={this.pressEnterToSend.bind(this)}
          />
        </div>
        <div>
          <button className="send-button">
            <svg height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m8.75 17.612v4.638c0 .324.208.611.516.713.077.025.156.037.234.037.234 0 .46-.11.604-.306l2.713-3.692z"/><path d="m23.685.139c-.23-.163-.532-.185-.782-.054l-22.5 11.75c-.266.139-.423.423-.401.722.023.3.222.556.505.653l6.255 2.138 13.321-11.39-10.308 12.419 10.483 3.583c.078.026.16.04.242.04.136 0 .271-.037.39-.109.19-.116.319-.311.352-.53l2.75-18.5c.041-.28-.077-.558-.307-.722z"/></svg>
          </button>
        </div>
        </form>
      </div>
    );
  }
}

export default MessageForm;