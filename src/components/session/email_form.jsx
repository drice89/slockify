import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { spotifyLogin } from "../../util/session_api_util";

const EmailForm = (props) => {
  useEffect(() => {
    return () => {
      props.clearErrors() 
    }
  }, [])
  return (
    <div className="auth-form">
      <div>
        <h1>First, enter your email</h1>
      </div>
      <div>
        <input type="email" 
          placeholder="email@yourawesomedomain.io" 
          size="38"
          onChange={props.update("email")} 
          value={props.email} 
        />
      </div>
      <div>
        <Link to={`${props.match.path}/2`}>
          <button className="cta-button">Confirm</button>
        </Link>
      </div>
      <div className="extra-spacing">
        <div><a href="/auth/spotify"><button className="cta-button cta-inverse" onClick={spotifyLogin}>Login With Spotify</button></a></div>
        <div><button className="cta-button cta-inverse" onClick={props.loginDemoUser}>Login as Demo User</button></div>
      </div>
    </div>
  )
}

export default EmailForm;

