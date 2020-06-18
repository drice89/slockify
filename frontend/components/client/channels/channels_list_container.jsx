import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "../modals/modal";
import { openModal } from "../../../actions/ui_actions";
import { getAllChannels } from "../../../actions/conversation_actions";

const mapStateToProps = (state) => ({
  channels: state.entities.channels || {}
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
  
  render() {
    const allChannels = Object.values(this.props.channels)
    return (
      <div>
        <Modal/>
        <div>
          Channels
        </div>
        <div>
          <button onClick={() => this.props.openModal("channel")}>Create</button>
        </div>
        <ul>
          {
            allChannels.map((channel) => {
              return (
                <li key={channel.name}>
                  {channel.name}
                </li>
              )
            })
          }
        </ul>
      </div>
    )}
} 



export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)