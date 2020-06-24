import React from "react"

const ConversationHeader = ({conversation, users, currentUserId, toggleSidebar}) => (
  <div className="message-header">
    <div>
        <h3>
          {
          conversation.convoType === "channel" 
          ?
          conversation.name
          :
          conversation.memberIds
            .map((id) => {
              if (id !== currentUserId) {
                return users[id].displayName || users[id].fullName
              }
              return ""
            })
            .join(", ")
            .replace(/,\s*$/, "")
          }
        </h3>
    </div>
    <div>
      <button onClick={() => toggleSidebar()}>Details</button>
    </div>
  </div>
)

export default ConversationHeader