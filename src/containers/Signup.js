import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setAuthToken } from '../utils';
import '../styles/signup.css';
import { Form, Input, InputNumber, Button } from 'antd';

class RegistrationForm extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios
          .post('https://node-task-manager-app.herokuapp.com/api/users', values)
          .then(response => {
            localStorage.setItem('JWT_token', response.data.token);
            setAuthToken(response.data.token);
            this.props.history.push('/todo');
          })
          .catch(err => {
            console.log({ err });
          });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div className="container">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <h1>Sign Up</h1>

          <Form.Item label="Name: " hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please input your Name'
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="E-mail" hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                },
                {
                  validator: this.validateToNextPassword
                },
                { min: 8, message: 'Password must be above 8 words' }
              ]
            })(<Input.Password />)}
          </Form.Item>

          <Form.Item label="Confirm: " hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>

          <Form.Item label="Age: ">
            {getFieldDecorator('age', {
              rules: [
                {
                  required: true,
                  message: 'Please input your Age'
                }
              ]
            })(<InputNumber min={0} />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button className="signup-button" type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>

          <div>
            Already a member, <Link to="/">login here</Link>
          </div>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(
  RegistrationForm
);

export default WrappedRegistrationForm;
