

export const messageSelector = (messageSliceOfState, conversationId) => {
  let res = []
  for (let k in messageSliceOfState) {
    if (messageSliceOfState[k].recipientId === conversationId )
      res.push(messageSliceOfState[k]);
  }
  return res;
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