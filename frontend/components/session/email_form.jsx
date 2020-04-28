import React from "react";
import { Link } from 'react-router-dom';

const EmailForm = (props) => (
  <div>
    <div>
      First, enter your email
    </div>
    <input type="text" 
      placeholder="email@yourawesomedomain.io" 
      onChange={props.update("email")} 
      value={props.email} 
    />
    <Link to={`${props.match.path}/2`}>
      <button>Confirm</button>
    </Link>
  </div>
)

export default EmailForm;

