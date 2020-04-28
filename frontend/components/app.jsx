import React from "react";
import { Switch, Route } from "react-router-dom";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import SplashMain from "./splash/splash_main";

const App = () => (
  <div>
    <Route exact path="/" component={SplashMain} />
    <Route path="/signup" component={SignupFormContainer} />
    <Route path="/login" component={LoginFormContainer} />
  </div>
)

export default App;