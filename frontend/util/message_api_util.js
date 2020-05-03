export const getMessage = (messageId) => (
  $.ajax({
    method: "GET",
    url: `api/messeges/${messageId}`
  })
);

export const deleteMessage = (messageId) => (
  $.ajax({
    method: "DELETE",
    url: `api/messeges/${messageId}`
  })
);