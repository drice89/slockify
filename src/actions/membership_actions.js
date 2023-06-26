import * as MembershipAPIUtils from "../util/membership_api_util";
import { receiveConversation, removeConversation, receiveConversationErrors } from "./conversation_actions";

export const newMembership = (membership) => dispatch => (
  MembershipAPIUtils.createMembership(membership)
    .then( conversation => dispatch(receiveConversation(conversation)))
    .fail(errors => dispatch(receiveConversationErrors(errors)))
);

export const updateMembership = (membership) => dispatch => (
  MembershipAPIUtils.updateMembership(membership)
    .then(conversation => dispatch(receiveConversation(conversation)))
    .fail(errors => dispatch(receiveConversationErrors(errors)))
);

export const deleteMembership = (membershipId) => dispatch => (
  MembershipAPIUtils.createMembership(membershipId)
    .then(conversation => dispatch(removeConversation(conversation.id)))
    .fail(errors => dispatch(receiveConversationErrors(errors)))
);