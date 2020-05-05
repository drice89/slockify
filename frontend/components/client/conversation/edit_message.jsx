import React from "react"

const EditMessage = (props) => (
  <div>
    <textarea value={this.props.messageText} onChange={() => this.props.onChange} ></textarea>
    <button>Cancel</button> <button onSubmit={this.onSubmit()}>Save Changes</button>
  </div>
)

export default EditMessage;