import React, { Component } from "react";
import { Route, Switch, withRouter, Link, Redirect } from "react-router-dom";
import Login from "../Login";
import RegistrationForm from "../Signup";
import axios from 'axios';
import Todo from "../Todo";
import UserProfile from "../UserProfile";
import { setAuthToken } from "../../utils";
import { Layout, Menu  } from "antd";

const { Header, Content, Footer } = Layout;

class AppContainer extends Component {
  constructor(props) {
    super(props);
    if (localStorage.JWT_token) {
      setAuthToken(localStorage.JWT_token);
      axios.get('https://node-task-manager-app.herokuapp.com/api/users/me')
      .then(response => props.history.push("/todo")).catch(er => {setAuthToken(""); localStorage.clear()});
    }
  }

  logOut = () => {
    localStorage.removeItem("JWT_token");
    window.location = '/';
  }

  render() {
    return (
      <div>
        <Layout className="layout">
          <Header className="header">
            <h2 className="logo">Task Manager App</h2>
            <Menu
              className="nav-links"
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: "64px" }}
            >
            {(localStorage.JWT_token) ? 
              <Menu.Item key="1"><Link to="/user">User</Link></Menu.Item>
              : null}
              
              {(localStorage.JWT_token) ? 
              <Menu.Item key="2" onClick={this.logOut}><Link to="/">Log out</Link></Menu.Item>
              : null}
            </Menu>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/signup" component={RegistrationForm} />
              <Route 
                path="/todo" 
                render={props => {
                  if(!localStorage.JWT_token) return <Redirect to="/" />; return <Todo />
                  }}
              />
              <Route 
              path="/user" 
              render={props => {
                  if(!localStorage.JWT_token) return <Redirect to="/" />; return <UserProfile />
                  }}
              />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>Created by Ramiz</Footer>
        </Layout>
      </div>
    );
  }
}

export default withRouter(AppContainer);
