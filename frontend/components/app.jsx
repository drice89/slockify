import React from "react";
import { Switch, Route } from "react-router-dom";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import SplashMain from "./splash/splash_main";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Client from "./client/client";

const App = () => (
  <div>
    <Switch>
      <Route path="/client/:userId/:conversationId" component={Client} />
      <Route path ="/client" component={Client} />
      
    </Switch>
    <Route exact path="/" component={SplashMain} />
    <Route path="/signup" component={SignupFormContainer} />
    <Route path="/login" component={LoginFormContainer} />
  </div>
)

export default App;