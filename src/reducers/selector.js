

// export const messageSelector = (messages, conversation) => {
//   return conversation.messageIds.map(messageId => {
//     return messages[messageId]; 
//   });
// }; 

// export const userSelector = (users, conversation) => {
//   return conversation.memberIds.map(memberId => users[memberId]);
// }; 

export const channelConversationsSort = (conversations) => {
  let res = [];
  conversations.forEach( conversation => {
    if (conversation.convoType === "channel") {
      res.push(conversation);
    }
  });
  return res;
}; 

export const directConversationsSort = (conversations, users, currentUserId) => {
  let res = [];
  conversations.forEach(conversation => {
    if (conversation.convoType !== "channel") {
      let newName = []
      conversation.memberIds.forEach((id) =>{ 
        if(id !== currentUserId) {
          const name = users[id].displayName || users[id].fullName
          newName.push(name)
        }
      })
      conversation.displayName = newName.join(", ")
      res.push(conversation);
    }
  });
  return res;
}; 

export const transformConversationNames = (conversations, users, currentUserId) => {
  let temp = {}
  Object.values(conversations).forEach((conversation) => {
    if (conversation.convoType !== "channel") {
      let newName = []
      let avatarUrls = [] 
      conversation.memberIds.forEach((id) =>{ 
        if(id !== currentUserId) {
          const name = users[id].displayName || users[id].fullName
          newName.push(name)
          if (avatarUrls.length < 3) avatarUrls.push(users[id].avatarUrl)
        }
      })
      const newNameString = newName.join(", ")
      temp[newNameString] = conversation
      temp[newNameString]["avatarUrls"] = avatarUrls 
    }
  })
  return temp
}
