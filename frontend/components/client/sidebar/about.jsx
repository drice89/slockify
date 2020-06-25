import React from "react"

const About = ({description, activeTab}) => {
  const processDescription = () => {
    debugger
    if (description.fullName) {
      return { "Name": description.fullName, "Display Name": description.displayName, "User Status": description.status }
    } else if (description.description) {
      return { "Channel Name": description.name, "Description": description.description || "No description set", "Spotify Playlist ID": description.playlistUrl, "Private Channel": description["isPrivate?"] || "false"  }
    }
  }

  const processedDescription = processDescription()
  return (
    <div>
      {
        Object.keys(processedDescription).map(k => {
          return (
            <div key={k}>
              <span>{k}</span><span>{processedDescription[k]}</span>
            </div>
          )
        })
      }
    </div>
  )
  }

export default About