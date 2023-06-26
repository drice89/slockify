export const getUserConversations = (userId) => (
  $.ajax({
    method: "GET",
    url: `/api/users/${userId}/conversations`
  })
);

export const getAllChannels = () => (
  $.ajax({
    method: "GET",
    url: `/api/conversations`
  })
);

export const getConversationWithMessages = (conversationId) => (
  $.ajax({
    method: "GET",
    url: `/api/conversations/${conversationId}`
  })
);

export const createConversation = (conversation) => (
  $.ajax({
    method: "POST",
    url: `/api/conversations`,
    data: { conversation }
  })
);

export const updateConversation = (conversation) => (
  $.ajax({
    method: "PATCH",
    url: `/api/conversations/${conversation.id}`,
    data: { conversation }
  })
);

export const deleteConversation = (conversationId) => (
  $.ajax({
    method: "DELETE",
    url: `api/conversations/${conversationId}`
  })
)
