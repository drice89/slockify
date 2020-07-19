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
              {/* <i id="message-options-button" className="fa fa-cog"> */}
                <div className="message-options">
                  <span><i className="fa fa-cog"></i></span>
                  <i onClick={() => edit()} className="fa fa-edit"></i>
                  <i onClick={() => remove()} className="fa fa-trash"></i>
                </div>
              {/* </i> */}
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