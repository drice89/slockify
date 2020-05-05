import React from "react";

const MessageContainer = ({message, conversationUsers}) => {
  const author = conversationUsers[message.authorId];
  const avatar = author.avatarUrl || window.defaultAvatarUrl;
  const name = author.displayName || author.fullName;
  const messageText = message.body;

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
      </span> <br />
    
      <div className="message-and-options-container">
        <div className="message-text">
          {messageText}
        </div>
        <div className="options">
            <i className="fa fa-cog"></i>
        </div>
      </div>
      
    </div>

  </div>
  )
}

export default MessageContainer