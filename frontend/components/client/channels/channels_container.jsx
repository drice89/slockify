import React from "react";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => ({
  subs: state.users[state.session.id].conversation_ids,
  conversations: state.conversations,
  currentUserId: state.session.id
});



class ChannelsContainer extends React.Component {
  componentDidMount() {
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
render() {
  const conversations = Object.values(this.props.conversations);
  return (
    <div className="conversations_menu">
      {
        conversations.map((conversation) => {
          <Link to={`client/${currentUserId}/${conversation.id}`}><button>{conversation.name}</button></Link>
        })
      }

    </div>
    );
  }
}

export default connect(mapStateToProps)(ChannelsContainer)