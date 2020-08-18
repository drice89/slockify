import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import SplashMain from "./splash/splash_main";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Client from "./client/client";

const App = () => (
  <div>
    <Switch>
      <ProtectedRoute path="/client/:userId/:conversationId" component={Client} />
      <ProtectedRoute path ="/client/:userId/channels" component={Client} />
      <Route exact path ="/client" component={Client}><Redirect to="/login" /></Route>
      <AuthRoute path="/signup" component={SignupFormContainer} />
      <AuthRoute path="/login" component={LoginFormContainer} />
      <Route exact path="/" component={SplashMain} />
      <Redirect to="/" />
    </Switch>
  </div>
)

export default App;