import React, { useState, useEffect } from "react"
import { closeModal } from "../../../actions/ui_actions"
import { connect } from "react-redux"

const mapStateToProps = (state) => ({
  channels: state.entities.channels,
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
})

const CreateChannelModal = ({channels, closeModal}) => {
  return (
    <div>
      <ul>
        <li>Create a channel</li>
        <li>
          <span>
            Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.
          </span>
        </li>
        <li>
          <div>
            Name
          </div>
          <div>
            <input type="text" placeholder="# e.g. heavy-metal"/>
          </div>
        </li>
        <li>
          <div>
            Description <span>(optional)</span>
          </div>
          <div>
            <input type="text" />
          </div>
          <div>
            <span>What's this channel about?</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannelModal)
