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
      <Route path="/client/:userId/:conversationId" element={<ProtectedRoute component={Client} />} />
      <Route path ="/client/:userId/channels" element={<ProtectedRoute component={Client} />} />
      <Route exact path ="/client" element={<Client />} />
      <Route path="/signup" element={<AuthRoute component={SignupFormContainer} /> }/>
      <Route path="/login" element={<AuthRoute component={LoginFormContainer} />} />
      <Route exact path="/" element={<SplashMain />} />
      {/* <Navigate to="/" /> */}
    </Routes>
  </div>
)

export default App;