import React from "react";
import { Link } from "react-router-dom";
import { channelConversationsSort, directConversationsSort } from "../../../reducers/selector";




const ChannelsContainer = ({conversations}) => {
  const conversationsArray = Object.values(conversations);
  const channels = channelConversationsSort(conversationsArray);
  //possibly lump group and direct into one type
  const direct = directConversationsSort(conversationsArray);
  return (
    <div>
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
          <li><h4>Direct</h4></li>
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

export default ChannelsContainer