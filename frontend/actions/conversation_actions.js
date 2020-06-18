import * as ConversationAPIUtil from "../util/conversation_api_util";

export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS";
export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CONVERSATION = "RECEIVE_CONVERSATION";
export const RECEIVE_EDITED_CONVERSATION = "RECEIVE_EDITED_CONVERSATION";
export const REMOVE_CONVERSATION = "REMOVE_CONVERSATION";
export const RECEIVE_CONVERSATION_ERRORS = "RECEIVE_CONVERSATION_ERRORS";
export const CLEAR_CHANNELS = "CLEAR_CHANNELS"

export const receiveConversation = (payload) => ({
  type: RECEIVE_CONVERSATION,
  payload
});

export const receiveEditedConversation = (conversation) => ({
  type: RECEIVE_EDITED_CONVERSATION,
  conversation
});


const receiveChannels = (channels) => ({
  type: RECEIVE_CHANNELS,
  channels
})

export const clearChannels = () => ({
  type: CLEAR_CHANNELS
})

export const removeConversation = (conversationId) => ({
  type: REMOVE_CONVERSATION,
  conversationId
});

export const receiveConversationErrors = (errors) => ({
  type: RECEIVE_CONVERSATION_ERRORS,
  errors
});

//This action is now performed by the login function
// export const getAllConversationsForUser = (userId) => dispatch => (
//   ConversationAPIUtil.getUserConversations(userId)
//     .then(conversations => dispatch(receiveConversations(conversations)))
//     .fail(errors => dispatch(receiveConversationErrors(errors)))
// );

export const getAllChannels = () => dispatch => (
  ConversationAPIUtil.getAllChannels()
    .then(conversations => dispatch(receiveChannels(conversations)))
    .fail(errors => dispatch(receiveConversationErrors(errors)))
);

// export const getConversationWithMessages = (conversationId) => dispatch => (
//   ConversationAPIUtil.getConversationWithMessages(conversationId)
//     .then(conversation => dispatch(receiveConversation(conversation)))
//     .fail(errors => dispatch(receiveConversationErrors(errors)))
// );

// export const createNewConversation = (conversation) => dispatch => (
//   ConversationAPIUtil.createConversation(conversation)
//     .then(conversation => dispatch(receiveConversation(conversation)))
//     .fail(errors => dispatch(receiveConversationErrors(errors)))
// );

// export const editConversation = (conversation) => dispatch => (
//   ConversationAPIUtil.updateConversation(conversation)
//     .then(conversation => dispatch(receiveConversation(conversation)))
//     .fail(errors => dispatch(receiveConversationErrors(errors)))
// );

// export const deleteConversation = (conversationId) => dispatch => (
//   ConversationAPIUtil.deleteConversation(conversationId)
//     .then(conversation => dispatch(removeConversation(conversation.id)))
//     .fail(errors => dispatch(receiveConversationErrors(errors)))
// );
