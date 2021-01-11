import React, { Component } from "react";
import { Modal, Button, Input } from "antd";
import "../styles/todo.css";

class AddTodo extends Component {
  state = {
    content: ""
  };

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.content === "") return false;
    this.props.addTodo(this.state);
    this.setState({
      visible: false,
      content: ""
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

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div className="add-button">
        <Button style={{marginBottom: "20px"}} type="primary" onClick={this.showModal}>
          Add Todo
        </Button>

        <Modal
          title="Add a todo"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <form onSubmit={this.handleSubmit}>
            <Input
              autoFocus
              onChange={this.handleChange}
              value={this.state.content}
            />
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddTodo;
