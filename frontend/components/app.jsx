import React from "react";
import { Switch, Route } from "react-router-dom";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";

const App = () => (
  <div>
    something <img className="logo" src="/assets/logos/logo-75px.png" /><span className="logo-text">Slockify</span>
    <Route path="/signup" component={SignupFormContainer} />
    <Route path="/login" component={LoginFormContainer} />
    We are live
  </div>
)

export default App;