//Notes for refactor:
//Subscription needs to be moved into the messages conversations_container and should intiialize the subscription when the component mounts
//unsubscribe function should be triggered when component unmounts
//AJAX call to the server for USERS and MESSAGES should fire when the component mounts
//Refactor MESSAGES REDUCER to only save the the messages from the currntly subscribed channel
// May need to recator state to props


//Dear future Dillon,
//I was midway through getting my Add/remove/edit conversations feature done when I ran out of time
//check the issuues in GitHub.
//today 5/8, i worked on getting the conversations crud features up and running
//if you look in component did mount you will see all of the subscriptions to the action cables
//chat channel is the message channel - crud operatins related to the message occur there.
//master channel is the conversations chanel - the idea is that it will update all users when a change to a conversation
//occurs and if it is relevant to the user, the user will update their state.
//Remove membership was tricky because it needs to fire edit membership for everyone who is still active in a channel
//Make sure to add some kind of component that prevents users from removing themselves from group and DMs
//You need to add the "Add {dm/channel}" button. That should call subscription.createChannel and pass in
//The parameters you need to create a new conversation - make sure to make the owner an admin
//You will need to prevent the user from making the same convo that already exists
//You will need to allow the user to see a list of all users... possibly search by name. Never figured that one out...

//For the edit functionallity you will want to look at the switch statement and pass in an action depending on the function.
//you should add the sidebar (good luck with that one!) that is hidden and then adjusts all of the content on the page when it
//appears. that should have "members", "playlist", and "details"
//if convo is a DM display the users data on details
//if convo is GM then dont display details
//if convo is a channel then display the desciption and owner

//you should be able to remove yourself from a channel if you are a member
//you should be able to remove anyone from a channel if you are not a member
//at this point you should add the playlist integration

//You will want to add the rich text editor and the styling last and dont forget to
//remove the lodash dependency because you didnt use it

//Get the app in a presentable state THEN refactor. Dont optimize prematurely.
//1. get convo crud working, 2.get channel playlists set up, 3.style and rich text. Then do the rest.

//FINAL NOTE:
//There are 2 channels with 2 methods. If you are having problems with calling a method
//check to make sure the subscription points at the correct channels

//PS dont forget to breathe - you will get through this!

//Contains all components related to the messages in the conversation
//constructs the message_container which then contains the read, edit, delete actions
//constructs the message_form containse the create message action

import React from "react";
import { connect } from "react-redux";
import SearchBarContianer from "./search_bar/search_bar_container";
import ChannelsContainer from "./channels/channels_container";
import { withRouter } from "react-router-dom";



import ConversationsContainer from "./conversation/conversations_container.jsx";


const mapStateToProps = (state) => {
  return {
    sessionId: state.session.id,
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


  //right side panel rendered in conversations container
  render () {
    const ConversationContainer = withRouter(ConversationsContainer);
    const ChannelContainer = withRouter(ChannelsContainer)
    return( 
      <div className="client-container">
        <div className="search-bar-container">
          <SearchBarContianer />
        </div>
        <div className="channel-container">
          <ChannelContainer />
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

export default connect(mapStateToProps)(Client)