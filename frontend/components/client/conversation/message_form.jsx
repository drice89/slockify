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
     //the first subscription is to master and that DOES NOT have the speak function
     //so we index into the second subscription and it makes things work.
     //this may need to be refactored when we have the subscriptions on demand
    App.cable.subscriptions.subscriptions[1].speak({ message: this.state });
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