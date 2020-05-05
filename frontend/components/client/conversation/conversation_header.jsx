import React from "react"

const ConversationHeader = ({conversation}) => (
  <div className="message-header">
    <div>
        <h3>
          {conversation.name}
        </h3>
    </div>
    <div>
      Details
    </div>
  </div>
)

export default ConversationHeader