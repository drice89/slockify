

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

export const directConversationsSort = (conversations) => {
  let res = [];
  conversations.forEach(conversation => {
    if (conversation.convoType !== "channel") {
      res.push(conversation);
    }
  });
  return res;
}; 

export const transformConversationNames = (conversations, users, currentUserId) => {
  let temp = {}
  Object.values(conversations).forEach((conversation) => {
    let newName = []
    let avatarUrls = [] 
    conversation.memberIds.forEach((id) => {
      if(id !== currentUserId) {
        newName.push(users[id].name)
        if (avatarUrls.length < 3) avatarUrls.push(users[id].avatarUrl)
      }
    })
    temp[newName] = conversation
    temp[newName]["avatarUrls"] = avatarUrls 
  })
  return temp
}

export const transformUserNames = (users) => {
  let temp = {}

  Object.values(users).forEach((user) => {
    const name = user.displayName || user.fullName
    temp[name] = user
  })
  return temp
}

