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

  handleSubmit(e) {
    e.preventDefault();
     //look at subscriptions array when there are multiple subscriptions
    App.cable.subscriptions.subscriptions[0].speak({ message: this.state });
    this.setState({ body: "" });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <textarea
            value={this.state.body}
            onChange={this.update("body")}
            placeholder="Type message here"
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default MessageForm;