import React from "react";
import { Link } from "react-router-dom"

const LaunchButton = ({session}) => (

<div>
    <Link to={`/client/${session}/6`}><button>Launch Slockify</button></Link>
</div>

)

export default LaunchButton;