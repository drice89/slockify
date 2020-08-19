import React, { useState, useEffect } from "react"
import { closeModal } from "../../../actions/ui_actions"
import { connect } from "react-redux"

const mapStateToProps = (state) => ({
  channels: state.entities.channels,
  currentUser: state.entities.users[state.session.id]
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
})

const CreateChannelModal = ({channels, closeModal, currentUser}) => {
  const [channelName, setChannelName] = useState("")
  const [warning, setWarning] = useState("")
  const [channelDescription, setDescription] = useState("")
  const [isPrivate, setPrivate] = useState(false)

  useEffect(() => {
    if (transformedChannels[channelName.toLowerCase()]) setWarning("Channel already exists")
    return () => {
      setWarning("")
    }
  }, [channelName])

  const handleClick = () => {
    if(channelName === "") {
      return setWarning("Channel name can't be blank")
    } else if (warning === "Channel already exists") {
      return setWarning ("Cannot create channel with that name")
    } 

    const conversation = {
      name: channelName, 
      ownerId: currentUser.id, 
      convoType: "channel",
      "isPrivate?": isPrivate,
      description: channelDescription
    }

     const members = { [currentUser.id]: currentUser}

    App.cable.subscriptions.subscriptions[0].createConversation({conversation, members, currentUser: currentUser.id});
    closeModal(); 
  }

  const handleChange = (event) => {
    setChannelName(event.currentTarget.value)
  }

  const togglePrivate = () => {
    if (isPrivate) {
      setPrivate(false)
    } else {
      setPrivate(true)
    }
  }
   
  const transformChannels = () => {
    const res = {}
    Object.values(channels).forEach((channel) => {
     res[channel.name.toLowerCase()] = true
    })
    return res
  }

  const transformedChannels = transformChannels()
  return (
    <div className="create-channel-modal">
      <div><h2>Create a channel</h2></div>
      <div><span>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</span></div>
      <ul>
        <li> Name <span>{warning}</span> </li>
        <li>
          <div className="modal-input-container"><input type="text" placeholder="# e.g. heavy-metal" onChange={(e) => handleChange(e)} value={channelName} /></div>
        </li>
        <li> Description <span>(optional)</span> </li>
        <li>
          <div className="modal-input-container">
            <input type="text" value={channelDescription} onChange={(e) => setDescription(e.currentTarget.value)}/>
            <h5>What's this channel about?</h5>
          </div>
        </li>
        <li>
          <div className="private-channel-option">
            <h3>Make channel private?</h3>
            <input type="checkbox" onChange={() => togglePrivate()} />
          </div>
          <div>When a channel is set to private, it can only be viewed or joined by invitation.</div>
          <div className="modal-button-container">
            <button onClick={handleClick}>Create</button>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannelModal)
