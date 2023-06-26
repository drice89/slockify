import Logo from "../../headers/logo";
import { connect } from "react-redux";
import LaunchButton from "./launch_button";
import SignupLoginButtons from "./signup_login_buttons";
import React from "react";

const Navbar = ({session}) => (
  <nav className="main-nav">
    <div className="nav-container">
      <div className="logo-container">
        <Logo />
      </div>
      <nav className="nav-list">
        <ul className="nav-ul">
          <li>Why Slockify?</li>
          <li><a href="https://www.linkedin.com/in/dillon-rice-48339a47/">Solutions</a></li>
          <li><a href="https://www.slack.com">Slack</a></li>
          <li><a href="https://www.spotify.com">Spotify</a></li>
          <li>It's Free</li>
        </ul>
        {
          session ? <LaunchButton session={session} /> : <SignupLoginButtons />
        }
      </nav>
    </div>
  </nav>
)

const mstp = (state) => ({
  session: Boolean(state.session.id)
});

export default connect(mstp)(Navbar)
