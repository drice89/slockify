//path is being passed as a string from the sign up and login containers. change this so it just references ownProps
//formType and also be a reference to ownProps

import React from "react";
import { Link } from "react-router-dom";
import Logo from "../headers/logo";
import { spotifyLogin } from "../../util/session_api_util";
import get from 'lodash/get';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      fullName: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.loginDemoUser = this.loginDemoUser.bind(this)
    this.showSignup = this.showSignup.bind(this)
  }

  update(field) {
    return this.setState({ [field]: value });
  }

  handleSubmit() {
    this.props.action(this.state)
  }

  showErrors() {
    return this.props.errors.map((error, idx) => <li key={`${idx}e`}>{error}</li>)
  }

  loginDemoUser() {
    const demoUser = { email: "demouser@slockify.io", password: "password123!" };
    this.props.formType === "Sign Up" ? this.props.demo(demoUser) : this.props.action(demoUser);
  }

  changeLoginType(path) {
    if (path === "login") {
      return (<div>New to Slockify? <Link to="/signup">Sign Up</Link></div>)
    } else {
      return (<div>Already have an account? <Link to="/login">Log in</Link></div>)
    }
  }

  showSignup() {
    const path = get(this.props, "path", "")
    return path.match(/signup/ig)
  }

  componentWillUnmount () {
    this.props.clearErrors();
  }
  

  render() {
    return (
      <div className="auth-container">
        <div className="logo-wrapper">
          <Logo />
        </div>
        <div>
          <div className="auth-form">
            <div>
              <input type="email" 
                placeholder="email@yourawesomedomain.io" 
                size="38"
                onChange={() => this.update('field')} 
                value={get(this.state, "email")} 
              />  
            </div>
            <div>
              <input 
                size="38" 
                type="password" 
                placeholder="Password" 
                onChange={() => this.update("password")} 
                value={get(this.state, 'password')} 
              />
            </div>
            { this.showSignup()  && 
              (<div>
                <input 
                  size="38" 
                  type="text" 
                  placeholder="Enter your full name here" 
                  onChange={() => this.update("fullName")} 
                  value={get(this.state, "fullName")} 
                />
              </div>) 
            }
              <div className="extra-spacing">
                <div><a href="/auth/spotify"><button className="cta-button cta-inverse" onClick={spotifyLogin}>Login With Spotify</button></a></div>
                <div><button className="cta-button cta-inverse" onClick={this.loginDemoUser}>Login as Demo User</button></div>
            </div>
            <div>
              <button className="cta-button">Confirm</button>
            </div>
          </div>
          <div className="login-type">
            {
              this.changeLoginType(this.props.path)
            }
          </div>
        </div>
          {
            this.props.errors.length >= 1 ? this.showErrors() : ""
          }
      </div>
    )
  }

}

export default SessionForm;