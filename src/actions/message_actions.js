

import * as MessageAPIUtil from "../util/message_api_util";

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export const RECEIVE_MESSAGE_ERRORS = "RECEIVE_MESSAGE_ERRORS";
export const RECEIVE_EDIT = "RECEIVE_EDIT";

export const receiveMessage = (message) => ({
 type: RECEIVE_MESSAGE,
 message
});

export const receiveEditedMessage = (message) => ({
  type: RECEIVE_EDIT,
  message
});

export const removeMessage = ( message ) => ({
  type: REMOVE_MESSAGE,
  message
});

const receiveMessageErrors = (errors) => ({
  type: RECEIVE_MESSAGE_ERRORS,
  errors
});

export const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages
})

export const getMessages = (conversationId) => dispatch => (
  MessageAPIUtil.getMessages(conversationId)
    .then( messages => dispatch(receiveMessages(messages)))
    .fail(errors => dispatch(receiveMessageErrors(errors)))
)
