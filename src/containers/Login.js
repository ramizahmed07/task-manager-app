import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { setAuthToken } from "../utils";
import "../styles/login.css";
import { Form, Input, Icon, Button } from "antd";
const FormItem = Form.Item;

class LoginForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios
          .post(
            "https://node-task-manager-app.herokuapp.com/api/users/login",
            values
          )
          .then(response => {
            localStorage.setItem("JWT_token", response.data.token);
            setAuthToken(response.data.token);
            this.props.history.push("/todo");
          })
          .catch(err => {
            console.log({ err });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        <Form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <FormItem>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(
              <Input addonBefore={<Icon type="user" />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" },
                { min: 8, message: "Password must be above 8 words" }
              ]
            })(
              <Input
                addonBefore={<Icon type="lock" />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </FormItem>

          <div className="signUp">
            Not a member?{" "}
            <Link to="/signup" className="signUpLink">
              Sign up now
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}

const Login = Form.create({ name: "login" })(LoginForm);

export default Login;
