import React from "react";



const DisplayMessage = ({message, edit, remove, currentUserId}) => (
  <div className="message-and-options-container">
    <div className="message-text">
      {message.body}
    </div>
    {
      currentUserId === message.authorId 
        ? 
          (
            <div className="options">
              <i id="message-options-button" className="fa fa-cog">
                <ul className="message-options">
                  <li>MESSAGE OPTIONS</li>
                  <li><button onClick={() => edit()}>EDIT</button></li>
                  <li><button onClick={() => remove()}>DELETE</button></li>
                </ul>
              </i>
            </div>
          ) 
        : 
          (
            <div></div>
          )
    }
  </div>
)

export default DisplayMessage;