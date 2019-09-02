import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import RegistrationForm from './components/Signup';
import Todo from './components/Todo';

class App extends Component {
  render() {
      return (
      <div className="container-bg">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" component={RegistrationForm} />
          <Route path="/todo" component={Todo} />
        </Switch>
      </div>
    );
  }  
}

export default App;
