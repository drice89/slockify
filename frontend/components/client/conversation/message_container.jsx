import React from "react";
import DisplayMessage from "./display_message";


class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      body: this.props.message.body
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(field) {
    e => this.setState({ [field]: e.currentTarget });
  }

  delete(messageId) {
    this.props.deleteMessage(this.props.message.id);
  }

  edit() {
    this.setState({ edit: true })
  }

  submitEdit() {
    const m = { 
      id: this.props.message.id,
      body: this.state.body,
      authorId: this.props.currentUser,
      recipientId: this.props.conversationId
    };
    this.props.editMessage(m);
  }


  render () {
    const author = this.props.conversationUsers[currentUserId];
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
            <EditMessage onChange={this.onChange} submitEdit={this.submitEdit} messageText={this.state.body} /> 
          :
            <DisplayMessage edit={this.edit} delete={this.delete} messageText={this.state.body}/>
          }
          
      </div>
    )
  }
}

export default MessageContainer