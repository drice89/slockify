import React from "react";



const DisplayMessage = ({messageText, onSubmit, onChange}) => (
  <div className="message-and-options-container">
    <div className="message-text">
      {this.state.body}
    </div>
    <div className="options">
      <i id="message-options-button" className="fa fa-cog">
        <ul className="message-options">
          <li>Message Options</li>
          <li>Edit</li>
          <li>Delete</li>
        </ul>
      </i>
    </div>
  </div>
)

export default DisplayMessage;