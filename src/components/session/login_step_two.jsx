import React, {useEffect} from "react";

const LoginStepTwo = (props) => {
  useEffect(() => {
    return () => {
      props.clearErrors() 
    }
  }, [])
  return(
    <div className="auth-form">
      <div>
        <h1>Please enter your password</h1>
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
        <button className="cta-button" onClick={props.handleSubmit}>Log In</button>
      </div>

    </div>
)}

export default LoginStepTwo;
