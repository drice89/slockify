import React from "react";

const EditMessage = ({update, submitEdit, messageText}) => (
  <div>
    <textarea value={messageText} onChange={update()} ></textarea>
    <button>Cancel</button> <button onClick={() => submitEdit()}>Save Changes</button>
  </div>
)

export default EditMessage;