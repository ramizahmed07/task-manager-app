import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import AppContainer from "./containers/AppContainer";

class App extends Component {
  render() {
    return (
      <div className="container-bg">
        <BrowserRouter>
          <AppContainer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
