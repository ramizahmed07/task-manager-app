import React, { Component } from 'react';
import { Modal, Button, Input } from 'antd';
import '../styles/todo.css';

class AddTodo extends Component {
  state = {
    content: ''
  };

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { addTodo } = this.props;
    const { content } = this.state;
    if (content === '') return false;
    addTodo(this.state);
    return this.setState({
      visible: false,
      content: ''
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.handleSubmit(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { content, visible } = this.state;
    return (
      <div className="add-button">
        <Button
          style={{ marginBottom: '20px' }}
          type="primary"
          onClick={this.showModal}
        >
          Add
        </Button>

        <Modal
          title="Add a todo"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <form onSubmit={this.handleSubmit}>
            <Input autoFocus onChange={this.handleChange} value={content} />
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddTodo;
