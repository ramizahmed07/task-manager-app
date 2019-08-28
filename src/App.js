import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Todo from './components/Todo';
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="container-bg">
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/todo" component={Todo} />
      </Switch>
    </div>
  );
}

export default App;
