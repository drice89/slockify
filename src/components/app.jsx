import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import SplashMain from "./splash/splash_main";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Client from "./client/client";

const App = () => (
  <div>
    <Routes>
      <ProtectedRoute path="/client/:userId/:conversationId" component={Client} />
      <ProtectedRoute path ="/client/:userId/channels" component={Client} />
      <Route exact path ="/client" component={Client}><Navigate to="/login" /></Route>
      <AuthRoute path="/signup" component={SignupFormContainer} />
      <AuthRoute path="/login" component={LoginFormContainer} />
      <Route exact path="/" component={SplashMain} />
      <Navigate to="/" />
    </Routes>
  </div>
)

export default App;