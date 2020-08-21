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
        // connected: () => { console.log('connected to master_channel') },
        // disconnected: () => { console.log('disconnected from master_channel')},
        received: data => {
          if (data.action === "status" || data.conversation.memberIds.includes(this.props.sessionId)) {
            switch (data.action) {
              case "new":
                if(!data.error) {
                  this.props.receiveConversation({ conversation: data.conversation, sessionId: this.props.sessionId});
                }
                if (data.requestingUser === this.props.sessionId) {
                  this.props.history.push(`/client/${this.props.sessionId}/${data.conversation.id}`)
                }
                break
              case "edit":
                this.props.receiveEditedConversation(data.conversation);
                if ((data.requestingUser === this.props.sessionId)) {
                  this.props.history.push(`/client/${this.props.sessionId}/${data.conversation.id}`)
                }
                break;
              //weve got two removes here
              case "remove":
                return this.props.receiveEditedConversation(data.conversation);
              case "status":
                return this.props.changeUserStatus(data.user);
              case "error":
                //should be dispatched to store
                return console.log(data.error)
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

  componentWillUnmount() {
     App.cable.subscriptions.remove(App.cable.subscriptions.subscriptions[0])
     //console.log("channels unmounted")
  }

  limitConvoLength(string) {
    if(string.length > 40) {
      string = string.substring(0,40) + "..."
    }
    return string
  }

 
  render(){
    const conversationsArray = Object.values(this.props.conversations);
    const channels = channelConversationsSort(conversationsArray);
    //possibly lump group and direct into one type
    const direct = directConversationsSort(conversationsArray, this.props.users, this.props.sessionId);
    return (
      <div className="channels-container">
        <div className="username-display">
          <div>
            <div>
              <h3>Slockify</h3>
            </div>
            <div>
              {this.props.users[this.props.sessionId].displayName || this.props.users[this.props.sessionId].fullName}
            </div>
          </div>
          <div>
            <button onClick={() => this.props.openModal("dm") } className="new-message-button">
              <svg id="Capa_1" height="512" viewBox="0 0 512.001 512.001" width="512" xmlns="http://www.w3.org/2000/svg"><g id="XMLID_1043_"><g id="XMLID_694_"><path id="XMLID_697_" d="m255.985 210.001c-25.364 0-46 20.636-46 46s20.636 46 46 46 46-20.636 46-46-20.635-46-46-46zm0 72c-14.336 0-26-11.663-26-26s11.664-26 26-26 26 11.663 26 26-11.663 26-26 26z"/><path id="XMLID_726_" d="m255.985 162.001c-51.832 0-94 42.168-94 94s42.168 94 94 94 94-42.168 94-94-42.168-94-94-94zm0 168c-40.804 0-74-33.196-74-74s33.196-74 74-74 74 33.196 74 74-33.196 74-74 74z"/><path id="XMLID_729_" d="m511.594 7.232c-1.529-5.307-7.07-8.364-12.378-6.84l-50.946 14.682c-4.806.729-8.489 4.878-8.489 9.887v71.132c-4.718-2.913-10.05-4.921-15.756-5.775-21.235-21.549-45.991-38.6-73.657-50.684-29.824-13.027-61.579-19.633-94.382-19.633-63.038 0-122.303 24.548-166.877 69.123-44.574 44.574-69.123 103.839-69.123 166.877 0 30.368 5.656 59.777 16.803 87.595-7.116 2.872-13.783 7.182-19.543 12.941-22.976 22.977-22.976 60.362 0 83.339l69.196 69.196c1.953 1.952 4.512 2.929 7.071 2.929s5.119-.977 7.071-2.929l44.633-44.633c33.937 18.053 72.067 27.562 110.769 27.562 46.681 0 91.817-13.608 130.531-39.354 4.599-3.059 5.848-9.266 2.789-13.865-3.058-4.599-9.266-5.847-13.864-2.789-35.421 23.558-76.729 36.009-119.456 36.009-33.365 0-66.257-7.722-95.912-22.418l9.707-9.707c22.976-22.977 22.976-60.362 0-83.339-20.747-20.745-53.24-22.76-76.267-6.04-10.909-7.922-23.944-11.63-36.847-11.142-11.064-26.387-16.68-54.39-16.68-83.354 0-119.103 96.897-216 216-216 53.482 0 103.659 19.14 143.146 54.233-13.824 6.882-23.35 21.155-23.35 37.617 0 23.159 18.841 42 42 42 12.549 0 23.822-5.539 31.525-14.292 14.88 29.804 22.679 62.801 22.679 96.442 0 42.729-12.452 84.035-36.009 119.455-3.059 4.599-1.81 10.807 2.789 13.864 1.703 1.133 3.626 1.675 5.529 1.675 3.235 0 6.41-1.567 8.336-4.463 25.747-38.712 39.355-83.85 39.355-130.531 0-42.159-11.216-83.4-32.465-119.52.168-1.521.261-3.064.261-4.629v-99.28l44.973-12.961c5.305-1.532 8.367-7.073 6.838-12.38zm-411.011 363.448c15.179-15.178 39.876-15.177 55.054 0 15.178 15.178 15.178 39.875 0 55.054l-62.125 62.125-62.125-62.125c-15.178-15.179-15.178-39.876 0-55.054 7.589-7.589 17.559-11.384 27.527-11.384s19.938 3.795 27.527 11.384c3.906 3.904 10.237 3.904 14.142 0zm317.198-216.828c-12.131 0-22-9.869-22-22s9.869-22 22-22 22 9.869 22 22-9.869 22-22 22z"/><path id="XMLID_737_" d="m255.985 444.668c104.031 0 188.667-84.636 188.667-188.667 0-5.522-4.477-10-10-10s-10 4.478-10 10c0 93.003-75.664 168.667-168.667 168.667-5.523 0-10 4.478-10 10s4.477 10 10 10z"/><path id="XMLID_738_" d="m245.985 387.334c0 5.522 4.477 10 10 10 77.932 0 141.333-63.401 141.333-141.333 0-5.522-4.477-10-10-10s-10 4.478-10 10c0 66.903-54.43 121.333-121.333 121.333-5.523 0-10 4.478-10 10z"/><path id="XMLID_739_" d="m415.795 405.811c-2.63 0-5.21 1.061-7.08 2.92-1.86 1.87-2.92 4.44-2.92 7.08 0 2.63 1.06 5.21 2.92 7.07 1.87 1.86 4.44 2.93 7.08 2.93 2.63 0 5.21-1.069 7.07-2.93s2.93-4.44 2.93-7.07c0-2.64-1.07-5.21-2.93-7.08-1.86-1.86-4.44-2.92-7.07-2.92z"/></g></g></svg>
            </button>
          </div>
        </div>
        <div className="conversation-section">
          <ul>
            <lh className="channels-section-header">
              <h4>Channels</h4>
              <button className="add-channel-button"><Link to="channels">+</Link></button>
            </lh>
            {
              channels.map((channel) => {
                return <li key={`${channel.id}convo`}><Link to={`${channel.id}`}><button className="conversation-button">{`# ${this.limitConvoLength(channel.name)}`}</button></Link></li>
              })
            }
          </ul>
        </div>
        <div className="conversation-section">
          <ul>
            <lh className="channels-section-header">
              <h4>Direct Messages</h4>
              <button className="add-channel-button" onClick={() => this.props.openModal("dm")}>+</button>
            </lh>
             
            {
              direct.map((direct) => {
                return <li key={`${direct.id}convo`}><Link to={`${direct.id}`}><button className="conversation-button">{this.limitConvoLength(direct.displayName)}</button></Link></li>
              })
            }
          </ul>
        </div>
      </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsContainer)