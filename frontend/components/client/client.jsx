import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  sessionId: state.session.id
});

//needs sessionId from state
//needs getUserChannels from dispatch

class Client extends React.Component {


  componentDidMount () {
    const urlSessionId = this.props.match.userId;
    const sessionId = this.props.sessionId;     
    if (urlSessionId !== sessionId) {
      const currentUrl = this.props.location.pathname
      const newUrl = currentUrl.replace(`/client/${urlSessionId}`, `/client/${sessionId}`); 
      this.props.history.replace(newUrl);
    }

  }

  //right side panel rendered in conversations container
  render () {
    return( 
      <div className="client-container">
        <SearchBarContianer />
        <ChannelsContainer />
        <ConversationContainer />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Client)