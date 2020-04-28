import React from "react";
import { Route } from "react-router-dom";
import Logo from "../headers/logo";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      fullName: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
  }

  showErrors() {
    //debugger
    return this.props.errors.map((error, idx) => <li key={`${idx}e`}>{error}</li>)
  }


  render() {
    return (
      <div>
        <Logo />
        <ul>
          {
            this.showErrors()
          }
        </ul>
        <Route exact path={`/${path}`} component={EmailForm} />
        <Route exact path="/signup/2" component={CompleteSignUp} />
        <Route exact path="/login/2" component={CheckCredentials} /> 
      </div>
    )
  }

}

export default SessionForm;