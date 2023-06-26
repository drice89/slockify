import React, { useEffect } from "react";

//add confirm password input
const SignupStepTwo = (props) => {
  useEffect(() => {
    return () => {
      props.clearErrors() 
    }
  }, [])
  return(
    <div className="auth-form">
      <div>
        <h1>
          Please provide a password and your full name
        </h1>
      </div>

      <div>
        <input 
          size="38" 
          type="password" 
          placeholder="Password" 
          onChange={props.update("password")} 
          value={props.password} 
        />
      </div>

      <div>
        <input 
          size="38" 
          type="text" 
          placeholder="Enter your full name here" 
          onChange={props.update("fullName")} 
          value={props.fullName} 
        />
      </div>
      
      <div>
        <button className="cta-button" onClick={props.handleSubmit}>Log In</button>
      </div>
    </div>
)}

export default SignupStepTwo;