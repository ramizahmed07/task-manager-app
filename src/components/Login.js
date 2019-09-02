import React, { Component } from "react";
import { Link } from "react-router-dom";
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
        console.log("Received values of form: ", values);
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
            {getFieldDecorator("userName", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                addonBefore={<Icon type="user" />}
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
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
