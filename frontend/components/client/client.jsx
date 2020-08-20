
import React from "react";
import { connect } from "react-redux";
import SearchBarContianer from "./search_bar/search_bar_container";
import ChannelsContainer from "./channels/channels_container";
import { withRouter } from "react-router-dom";
import ChannelsListContainer from "./channels/channels_list_container"
import ConversationsContainer from "./conversation/conversations_container.jsx";
import { logout } from "../../actions/session_actions"
import Modal from "./modals/modal"; 


const mapStateToProps = (state) => {
  return {
    sessionId: state.session.id,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})



class Client extends React.Component {
  constructor(props) {
    super(props);
  }

  //right side panel rendered in conversations container
  render () {
    const location = this.props.match.params.conversationId
    const ConversationContainer = withRouter(ConversationsContainer);
    const ChannelContainer = withRouter(ChannelsContainer)
    return( 
      <div className="client-container">
         <Modal />
        <div className="search-bar-container">
          <SearchBarContianer logout={this.props.logout}/>
        </div>
        <div className="channel-container">
          <ChannelContainer />
        </div>
        <div className="conversation-container">
          {
            location === "channels" ? <ChannelsListContainer/> : <ConversationContainer />
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client)