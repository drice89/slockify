//Notes for refactor:
//Subscription needs to be moved into the messages conversations_container and should intiialize the subscription when the component mounts
//unsubscribe function should be triggered when component unmounts
//AJAX call to the server for USERS and MESSAGES should fire when the component mounts
//Refactor MESSAGES REDUCER to only save the the messages from the currntly subscribed channel
// May need to recator state to props

//Contains all components related to the messages in the conversation
//constructs the message_container which then contains the read, edit, delete actions
//constructs the message_form containse the create message action

import React from "react";
import { connect } from "react-redux";
import SearchBarContianer from "./search_bar/search_bar_container";
import ChannelsContainer from "./channels/channels_container";
import { withRouter } from "react-router-dom";
import { receiveMessage, removeMessage, receiveEditedMessage } from "../../actions/message_actions";
import { receiveConversation, receiveEditedConversation, removeConversation} from "../../actions/conversation_actions";
import { changeUserStatus } from "../../actions/user_actions";
import ConversationsContainer from "./conversation/conversations_container.jsx";


const mapStateToProps = (state) => {
  return {
    sessionId: state.session.id,
    subs: state.entities.users[state.session.id].conversationIds,
    conversations: state.entities.conversations,
    currentUser: state.entities.users[state.session.id]
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    receiveMessage: message => dispatch(receiveMessage(message)),
    removeMessage: message => dispatch(removeMessage(message)),
    receiveEditedMessage: message => dispatch(receiveEditedMessage(message)),

    receiveConversation: conversation => dispatch(receiveConversation(conversation)),
    removeConversation: conversation => dispatch(removeConversation(conversation)),
    receiveEditedConversation: conversation => dispatch(receiveEditedConversation(conversation)),
    changeUserStatus: user => dispatch(changeUserStatus(user)),

  };
};



class Client extends React.Component {
  constructor(props) {
    super(props);
    this.enforceLocation();
  }

  enforceLocation() {
    //this is pushing the correct url but match.params is returning empty
    const urlSessionId = this.props.match.userId;
    const sessionId = this.props.sessionId;     
    if (urlSessionId !== sessionId) {
      this.props.history.push(`/client/${sessionId}/6`);
    }
  }


  componentDidMount () {
    App.cable.subscriptions.create(
      {
        channel: `MasterChannel`, 
        user: this.props.currentUser
      },
      {
        received: data => {
          if (data.conversation.memberIds.includes(this.props.sessionId)) {
            switch (data.action) {
              case "new":
                return this.props.receiveConversation({ conversation: data.conversation, sessionId: this.props.sessionId});
              case "edit":
                return this.props.receiveEditedConversation(data.conversation);
              case "remove":
                return this.props.receiveEditedConversation(data.conversation);
              case "status":
                return this.props.changeUserStatus(data.user);
              default:
                return null;
              }
            } else if (data.action === 'remove' && this.props.conversations[data.conversation.id]) {
              this.props.removeConversation({ conversation: data.conversation, sessionId: this.props.sessionId });
            }
        },
        createConversation: function (data) {
          return this.perform("create_conversation", data);
        },
        editConversation: function (data) {
          return this.perform("edit_conversation", data);
        }
      }
    );
    //this needs to be moved into the conversations component

    //subscribe to all channels
    this.props.subs.forEach((id) => {
      App.cable.subscriptions.create(
        { 
          channel: `ChatChannel`, 
          room: id 
        },
        {
          received: data => {
            switch(data.action) {
              case "new":
                return this.props.receiveMessage(data.message);
              case "update": 
                return this.props.receiveEditedMessage(data.message);
              case "remove":
                return this.props.removeMessage(data.message);
            }
          },
          speak: function (data) {
            return this.perform("speak", data);
          },
          update: function(data) {
            return this.perform("update", data);
          },
          remove: function (data) {
            return this.perform("remove", data);
          }
        });
    });

    //code for the master cable that all active users are subscribed to


  }

  //right side panel rendered in conversations container
  render () {
    const ConversationContainer = withRouter(ConversationsContainer);
    return( 
      <div className="client-container">
        <div className="search-bar-container">
          <SearchBarContianer />
        </div>
        <div className="channel-container">
          <ChannelsContainer conversations={this.props.conversations} />
        </div>
        <div className="conversation-container">
          {
            <ConversationContainer />
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client)