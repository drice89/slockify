import React from "react";
import { Link } from 'react-router-dom';

const EmailForm = (props) => (
  <div className="auth-form">
    <div>
      <h1>First, enter your email</h1>
    </div>
    <div>
      <input type="text" 
        placeholder="email@yourawesomedomain.io" 
        size="40"
        onChange={props.update("email")} 
        value={props.email} 
      />
    </div>
    <div>
      <Link to={`${props.match.path}/2`}>
        <button className="cta-button">Confirm</button>
      </Link>
    </div>
  </div>
)

export default EmailForm;

