import React from "react";

const EditMessage = ({update, submitEdit, messageText, edit}) => (
  <div className="edit-message-container">
    <div className ="text-area-wrapper">
      <textarea className="message-form-text-area" value={messageText} onChange={update()} ></textarea>
    </div>
    <div>
      <button onClick={()=> edit()}>Cancel</button> <button onClick={() => submitEdit()}>Save Changes</button>
    </div>
  </div>
)

export default EditMessage;