import React from "react";
import { Link } from "react-router-dom";




const ChannelsContainer = ({conversations, currentUserId}) => {
render(){
  const conversationsArray = Object.values(conversations);
  return (
    <div className="conversations_menu">
      {
        conversationsArray.map((conversation) => {
          <Link to={`client/${currentUserId}/${conversation.id}`}><button>{conversation.name}</button></Link>
        })
      }

    </div>
    );
  }
}

export default ChannelsContainer