import React from "react";
import { Link } from "react-router-dom"

const SignUpLoginButtons = () => (

  <div>
    <Link to="/login">Sign in</Link>
    <Link to="/signup"><button>GET STARTED</button></Link>
  </div>

)

export default SignUpLoginButtons;