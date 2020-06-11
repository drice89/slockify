import React from "react";
import { Link } from "react-router-dom";
import { channelConversationsSort, directConversationsSort } from "../../../reducers/selector";
import { receiveConversation, receiveEditedConversation, removeConversation} from "../../../actions/conversation_actions";
import { changeUserStatus } from "../../../actions/user_actions";
import { connect } from "react-redux";
import Modal from "../modals/modal";
import { openModal } from "../../../actions/ui_actions";

const mapStateToProps = (state) => {
  return {
    sessionId: state.session.id,
    conversations: state.entities.conversations,
    users: state.entities.users
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    receiveConversation: conversation => dispatch(receiveConversation(conversation)),
    removeConversation: conversation => dispatch(removeConversation(conversation)),
    receiveEditedConversation: conversation => dispatch(receiveEditedConversation(conversation)),
    changeUserStatus: user => dispatch(changeUserStatus(user)),
    openModal: component => dispatch(openModal(component))

  };
};

class ChannelsContainer extends React.Component {
  

  componentDidMount() {
    App.cable.subscriptions.create(
      {
        channel: `MasterChannel`, 
        user: this.props.sessionId
      },
      {
        received: data => {
          debugger
          if (data.action === "status" || data.conversation.memberIds.includes(this.props.sessionId)) {
            switch (data.action) {
              case "new":
                  return this.props.receiveConversation({ conversation: data.conversation, sessionId: this.props.sessionId});
              case "edit":
                return this.props.receiveEditedConversation(data.conversation);
              //weve got two here
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
  }

 
  render(){
    const conversationsArray = Object.values(this.props.conversations);
    const channels = channelConversationsSort(conversationsArray);
    //possibly lump group and direct into one type
    const direct = directConversationsSort(conversationsArray);
    return (
      <div>
        <Modal />
        <div className="conversation-section">
          <ul>
            <li><h4>Channels</h4></li>
            {
              channels.map((channel) => {
                return <li key={`${channel.id}convo`}><Link to={`${channel.id}`}><button>{channel.name}</button></Link></li>
              })
            }
          </ul>
        </div>
        <div className="conversation-section">
          <ul>
            <li className="direct-messages-header">
              <h4>Direct</h4>
              <button className="add-channel-button" onClick={() => this.props.openModal("dm")}>+</button>
            </li>
             
            {
              direct.map((direct) => {
                return <li key={`${direct.id}convo`}><Link to={`${direct.id}`}><button>{direct.name}</button></Link></li>
              })
            }
          </ul>
        </div>
      </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsContainer)