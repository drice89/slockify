import React from "react"
//import { messageSelector } from "../../../reducers/selector";
import { connect } from "react-redux";
import MessageForm from "./message_form";
import ConversationHeader from "./conversation_header";
import MessageContainer from "./message_container";
import { receiveMessage, removeMessage, getMessages } from "../../../actions/message_actions";
import { toggleSidebar } from "../../../actions/ui_actions";
import Sidebar from "../sidebar/sidebar"


const mapStateToProps = (state, ownProps) => {
  const historyLocation = ownProps.history.location.pathname.split("/");
  const conversationId = ownProps.match.params.conversationId || historyLocation[historyLocation.length-1];

  return {
    users: state.entities.users,
    messages: Object.values(state.entities.messages),
    currentUserId: state.session.id,
    conversation: state.entities.conversations[conversationId],
    sidebar: state.ui.sidebar
    };
};

const mapDispatchToProps = (dispatch) => ({
  getMessages: conversationId => dispatch(getMessages(conversationId)),
  editMessage: message => dispatch(receiveMessage(message)),
  deleteMessage: message => dispatch(removeMessage(message)),
  toggleSidebar: () => dispatch(toggleSidebar())
});


class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.bottom = React.createRef();
  }

  componentDidUpdate() {
   if (this.bottom.current) this.bottom.current.scrollIntoView();
  }

  componentDidMount() {
    this.props.getMessages(this.props.conversation.id)

      App.cable.subscriptions.create(
        { 
          channel: `ChatChannel`, 
          room: this.props.conversation.id 
        },
        {
          received: data => {
            switch(data.action) {
              //you can dry this out by changing the action in the action cables
              case "new":
                return this.props.editMessage(data.message);
              case "update": 
                return this.props.editMessage(data.message);
              case "remove":
                return this.props.deleteMessage(data.message);
              case "add song":
                return console.log(`${this.props.users[data.user].fullName} added a song`);
              case "error":
                return console.log(data.error);
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

        if (this.props.conversation.convoType === "channel" && this.props.sidebar === false) {
          this.props.toggleSidebar()
        }

  }

   componentWillUnmount() {
    for(let i =0; i < App.cable.subscriptions.subscriptions.length; i++) {
      //if its always the second subscription why not just index into it and unsub?
      let roomId = JSON.parse(App.cable.subscriptions.subscriptions[i].identifier).room
      if (roomId === this.props.conversation.id) {
        App.cable.subscriptions.remove(App.cable.subscriptions.subscriptions[i])
      }
    }
  }

  render() {
    const messageList = this.props.messages.map((message) => {
      return (
        <li key={`${message.id}message`} >
          <MessageContainer
              key={`${message.id}messagcontainer`}
              message={message} 
              conversationUsers={this.props.users} 
              currentUserId={this.props.currentUserId}
              editMessage={this.props.editMessage}
              deleteMessage={this.props.deleteMessage}
              conversationId={this.props.conversation.id}
          />
          <div ref={this.bottom} />
        </li>
      );
    });
    return (
      <div className="conversation-wrapper-grid">
        <div className="messages-window-grid-area">
          <div>
            <ConversationHeader 
              currentUserId={this.props.currentUserId} 
              conversation={this.props.conversation} 
              users={this.props.users}
              toggleSidebar={this.props.toggleSidebar}
            />
          </div>
          <div>{messageList}</div>
        </div>

        <div className={this.props.sidebar ? "side-bar-grid-area" :"hide-side-bar"}>
          <div>
            <Sidebar 
              conversation={this.props.conversation}
              users={this.props.users}
              currentUserId={this.props.currentUserId}
            />
          </div>
        </div>

        <div className="message-form-grid-area">
          <MessageForm
            currentUserId={this.props.currentUserId}
            conversationId={this.props.conversation.id}
            playlistUrl={this.props.conversation.playlistUrl || null}
            spotifyIntegration={this.props.users[this.props.currentUserId].spotifyIntegration} 
          />
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
