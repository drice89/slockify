import React from "react";

const LoginStepTwo = (props) => (
  <div>
    <div>Now, please enter your password</div>
    <input 
      type="password" 
      placeholder="Password" 
      onChange={props.update("password")} 
      value={props.password} 
    />
    <button onClick={props.handleSubmit}>Log In</button>
  </div>
)

export default LoginStepTwo;
