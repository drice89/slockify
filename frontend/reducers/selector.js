

export const messageSelector = (messages, conversation) => {
  return conversation.messageIds.map(messageId => messages[messageId] );
}; 

export const userSelector = (users, conversation) => {
  return conversation.memberIds.map(memberId => users[memberId]);
}; 

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