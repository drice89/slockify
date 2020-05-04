import React from "react";
import { Link } from "react-router-dom"

const LaunchButton = ({session}) => (

<div>
    <Link to={`/client/${session}`}><button>Launch Slockify</button></Link>
</div>

)

export default LaunchButton;