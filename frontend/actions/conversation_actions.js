import * as ConversationAPIUtil from "../util/conversation_api_util";

export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS";
export const RECEIVE_CONVERSATION = "RECEIVE_CONVERSATION";
export const REMOVE_CONVERSATION = "REMOVE_CONVERSATION";
export const RECEIVE_CONVERSATION_ERRORS = "RECEIVE_CONVERSATION_ERRORS";

const receiveConversation = (conversation) => ({
  type: RECEIVE_CONVERSATION,
  conversation
})

const receiveConversations = (conversations) => ({
  type: RECEIVE_CONVERSATIONS,
  conversations
});

const removeConversation = (conversationId) => ({
  type: REMOVE_CONVERSATION,
  conversationId
});

const receiveConversationErrors = (errors) => ({
  type: RECEIVE_CONVERSATION_ERRORS,
  errors
});

export const getAllConversationsForUser = (userId) => dispatch => (
  ConversationAPIUtil.getUserConversations(userId)
    .then(conversations => dispatch(receiveConversations(conversations)))
    .fail(errors => dispatch(receiveConversationErrors(errors)))
);

export const getAllConversations = () => dispatch => (
  ConversationAPIUtil.getAllConversations()
    .then(conversations => dispatch(receiveConversations(conversations)))
    .fail(errors => dispatch(receiveConversationErrors(errors)))
);

export const getConversationWithMessages = (conversationId) => dispatch => (
  ConversationAPIUtil.getConversationWithMessages(conversationId)
    .then(conversation => dispatch(receiveConversation(conversation)))
    .fail(errors => dispatch(receiveConversationErrors(errors)))
);

export const createNewConversation = (conversation) => dispatch => (
  ConversationAPIUtil.createConversation(conversation)
    .then(conversation => dispatch(receiveConversation(conversation)))
    .fail(errors => dispatch(receiveConversationErrors(errors)))
);

export const editConversation = (conversation) => dispatch => (
  ConversationAPIUtil.updateConversation(conversation)
    .then(conversation => dispatch(receiveConversation(conversation)))
    .fail(errors => dispatch(receiveConversationErrors(errors)))
);

export const deleteConversation = (conversationId) => dispatch => (
  ConversationAPIUtil.deleteConversation(conversationId)
    .then(conversation => dispatch(removeConversation(conversation.id)))
    .fail(errors => dispatch(receiveConversationErrors(errors)))
);
