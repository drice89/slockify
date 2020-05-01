import React from "react";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    //DO NOT LEAVE HARD CODED
    this.state = {
      body: "",
      authorId: 1,
      recipientId: 1
    };
  }
  update(field) {
    return e =>
      this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    //debugger //look at subscriptions array when there are multiple subscriptions
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