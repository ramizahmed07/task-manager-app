import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "../Login";
import RegistrationForm from "../Signup";
import Todo from "../Todo";
import { setAuthToken } from "../../utils";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    if (localStorage.JWT_token) {
      setAuthToken(localStorage.JWT_token);
      props.history.push("/todo");
    }
  }
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={RegistrationForm} />
        <Route path="/todo" component={Todo} />
      </Switch>
    );
  }
}

export default withRouter(AppContainer);
