import React from "react";

const SearchBar = ({logout}) => (
  <div className="inner-search">
    <img className="logo" src={window.logoUrl} alt="Slockify" />
    {/* <input className="search-bar" placeholder="Search"/> */}
    <button onClick={() => logout()}>Logout</button>
  </div>
) 

export default SearchBar;