import React from "react";
import { Link } from "react-router-dom"

const SignUpLoginButtons = () => (

  <ul>
    <li><Link to="/login">Sign in</Link></li>
    <li><Link to="/signup"><button>Get Started</button></Link></li>
  </ul>

)

export default SignUpLoginButtons;