import React from "react";

const LoginStepTwo = (props) => (
  <div className="auth-form">
    <div>
      <h1>Please enter your password</h1>
    </div>
    
    <div>
      <input 
        size="40"
        type="password" 
        placeholder="Password" 
        onChange={props.update("password")} 
        value={props.password} 
      />
    </div>

    <div>
      <button className="cta-button" onClick={props.handleSubmit}>Log In</button>
    </div>

  </div>
)

export default LoginStepTwo;
