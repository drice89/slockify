import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { openModal } from "../../../actions/ui_actions";
import { getAllChannels } from "../../../actions/conversation_actions";

const mapStateToProps = (state) => ({
  channels: state.entities.channels || {},
  currentUser: state.entities.users[state.session.id]
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllChannels: () => dispatch(getAllChannels()),
    openModal: component => dispatch(openModal(component))
  };
};



class ChannelList extends React.Component {
  
  componentDidMount() {
    this.props.getAllChannels()
  }

  //this is causing receive channels to fire continuously
  componentDidUpdate(prevProps) {
    if (Object.keys(prevProps.channels).length !== Object.keys(this.props.channels).length) {
      this.props.getAllChannels()
    }
  }

  joinChannel(conversation, member) {
    const data = { conversation, members: { [member.id]: member}, requestType: "add member", requestingUser: this.props.currentUser.id}
    App.cable.subscriptions.subscriptions[0].editConversation(data)
  }
  
  render() {
    const allChannels = Object.values(this.props.channels)
    
    return (
      <div className="channels-list">
        <div className="message-header">
          <h3>Channels</h3>
          <button id="create-new-channel-button" onClick={() => this.props.openModal("channel")}>Create Channel</button>
        </div>
        <ul>
          {
            allChannels.map((channel) => {
              return (
                <li className="channel-list-item" key={channel.name}>
                  <div>
                    <div>
                      <h3>{channel.name}</h3>
                    </div>
                    <div>
                      {channel.memberIds.length === 1 ? (<span>1 member</span>) : (<span>{channel.memberIds.length} members</span>) }
                      {channel.description ? (<span>&nbsp;&nbsp;·&nbsp;&nbsp;{channel.description}</span> ) : null }
                    </div>
                  </div>
                  <div>
                    
                      {
                        channel.memberIds.includes(this.props.currentUser.id) 
                        ?
                        <Link to={`/client/${this.props.currentUser.id}/${channel.id}`}><button>View Channel</button></Link>
                        :
                        (<button onClick={() => this.joinChannel(channel, this.props.currentUser)}>Join Channel</button>) 
                      }
                    
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )}
} 



export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)