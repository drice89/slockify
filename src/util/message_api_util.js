export const getMessages = (conversationId) => (
  $.ajax({
    method: "GET",
    url: `api/conversations/${conversationId}/messages`
  })
);
