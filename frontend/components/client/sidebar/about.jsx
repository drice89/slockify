import React from "react"

const About = ({description, activeTab}) => {
  const processDescription = () => {
    if (description.fullName) {
      return { "Name": description.fullName, "Display Name": description.displayName, "User Status": description.status }
    } else if (description.convoType === "channel") {
      return { "Channel Name": description.name, "Description": description.description || "No description set", "Spotify Playlist ID": description.playlistUrl, "Private Channel": description["isPrivate?"] || "false"  }
    }
  }

  const processedDescription = processDescription()
  return (
    <div className={activeTab === "about" || activeTab === "direct" ? "" : "hidden"}>
      {
        Object.keys(processedDescription).map(k => {
          return (
            <div key={k}>
              <span>{k}</span><span>{processedDescription[k]}</span>
              {processedDescription["Channel Name"] ? (<button>Edit Channel</button>): ""}
            </div>
          )
        })
      }
    </div>
  )
  }

export default About