export const getMessage = (messageId) = (
  $.ajax({
    method: "GET",
    url: `api/messeges/${messegeId}`
  })
);

export const deleteMessage = (messageId) = (
  $.ajax({
    method: "DELETE",
    url: `api/messeges/${messegeId}`
  })
);