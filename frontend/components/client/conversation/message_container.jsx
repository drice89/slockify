import React from "react";
import DisplayMessage from "./display_message";
import EditMessage from "./edit_message";


class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      body: this.props.message.body
    };
    this.submitEdit = this.submitEdit.bind(this);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
  }

  update() {
    return e => this.setState({ body: e.currentTarget.value });
  }

  remove() {
    App.cable.subscriptions.subscriptions[1].remove({ message: this.props.message });
  }

  edit() {
    this.setState({ edit: true});
  }

  submitEdit() {
    const m = { 
      id: this.props.message.id,
      body: this.state.body,
      authorId: this.props.currentUserId,
      recipientId: this.props.conversationId
    };
    App.cable.subscriptions.subscriptions[1].update({ message: m });
    this.setState({ edit: false });
  }


  render () {
    const author = this.props.conversationUsers[this.props.message.authorId];
    const avatar = author.avatarUrl || window.defaultAvatarUrl;
    const name = author.displayName || author.fullName;
    return (
  
      <div className="message-container">
        
        <div>
          <span className="avatar-span">
            <img className="avatar-img" src={avatar} />
          </span>
          <span>
            <h3>
              {name}
            </h3>
          </span>
        </div>
        {
          this.state.edit 
          ? 
            <EditMessage update={this.update.bind(this)} submitEdit={this.submitEdit} messageText={this.state.body} /> 
          :
            <DisplayMessage edit={this.edit} remove={this.remove} message={this.props.message} currentUserId={this.props.currentUserId} />
          }
          
      </div>
    )
  }
}

export default MessageContainer