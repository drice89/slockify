import React from "react";

const Logo = () => (
  <div className="logo-div">
    <span>
      <img className="logo" src={window.logoUrl} />
    </span>
    <span className="logo-text">
      Slockify
    </span>
  </div>
)

export default Logo;