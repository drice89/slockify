

import * as MessageAPIUtil from "../util/message_api_util";

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export const RECEIVE_MESSAGE_ERRORS = "RECEIVE_MESSAGE_ERRORS";

export const receiveMessage = (message) => ({
 type: RECEIVE_MESSAGE,
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


//get message should fire when cable informs of message update
//should add separate delete messege action
export const getMessage = (messageId) => dispatch => (
  MessageAPIUtil.getMessage(messageId)
    .then( message => dispatch(receiveMessage(message)))
    .fail(errors => dispatch(receiveMessageErrors(errors)))
)

//delete message function should occur in the actioncable -> only use if you cannot get that to work
// export const deleteMessage = (messageId) => dispatch => (
//   MessageAPIUtil.deleteMessage(messageId)
//     .then(() => dispatch(removeMessage(messageId)))
// );