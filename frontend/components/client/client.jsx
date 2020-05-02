import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  sessionId: state.session.id,
  subs: state.users[state.session.id].conversation_ids,
  conversations: state.conversations
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

    this.props.subs.forEach((id) => {
      App.cable.subscriptions.create(
        { channel: `${id}` },
        {
          received: data => {
            this.setState({
              messages: this.state.messages.concat(data.message)
            });
          },
          speak: function (data) {
            return this.perform("speak", data);
          }
        }
      );
    });

  }

  //right side panel rendered in conversations container
  render () {
    return( 
      <div className="client-container">
        <SearchBarContianer />
        <ChannelsContainer conversations={this.props.conversations} currentUserId={this.props.sessionId}/>
        <ConversationContainer />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Client)