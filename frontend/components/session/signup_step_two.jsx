import React from "react";

//add confirm password input
const SignupStepTwo = (props) => (
  <div>
    <div>Now, please set a password and provide your full name</div>
    <input type="password" placeholder="Password" onChange={props.update("password")} value={props.password} /><br />
    <input type="text" placeholder="Enter your full name here" onChange={props.update("fullName")} value={props.fullName} />
    <button onClick={props.handleSubmit}>Log In</button>
  </div>
)

export default SignupStepTwo;