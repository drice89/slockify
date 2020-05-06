//Contains all components related to the messages in the conversation
//constructs the message_container which then contains the read, edit, delete actions
//constructs the message_form containse the create message action

import React from "react";
import { connect } from "react-redux";
import SearchBarContianer from "./search_bar/search_bar_container";
import ChannelsContainer from "./channels/channels_container";
import { withRouter } from "react-router-dom";
import { receiveMessage, removeMessage, receiveEditedMessage } from "../../actions/message_actions";
import ConversationsContainer from "./conversation/conversations_container.jsx";


const mapStateToProps = (state) => {
  return {
    sessionId: state.session.id,
    subs: state.entities.users[state.session.id].conversationIds,
    conversations: state.entities.conversations
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    receiveMessage: message => dispatch(receiveMessage(message)),
    removeMessage: message => dispatch(removeMessage(message)),
    receiveEditedMessage: message => dispatch(receiveEditedMessage(message))
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
    //subscribe to all channels
    this.props.subs.forEach((id) => {
      App.cable.subscriptions.create(
        { 
          channel: `ChatChannel`, room: id 
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