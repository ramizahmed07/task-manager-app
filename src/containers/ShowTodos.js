import React, { Component } from "react";

import { List } from "antd";
import "../styles/todo.css";

class ShowTodos extends Component {
  state = {
    editing: false,
    currentTodo: "",
    description: ""
  };

  handleEditing = todo => {
    const { _id, description } = todo;
    this.setState({
      editing: true,
      currentTodo: _id,
      description
    });
  };

  handleChange = e => {
    this.setState({ description: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateTodo(this.state);
    this.setState({
      description: "",
      editing: false
    });
  };

  render() {
    const { showCompleted = false } = this.props;
    const { editing, currentTodo } = this.state;
    
    const todoList = (
      <List
        size="small"
        bordered
        dataSource={this.props.todos}
        renderItem={todo => (
          <List.Item
            actions={!showCompleted ? [
              <div className="button-container">
                <button
                  onClick={() => this.handleEditing(todo)}
                  className="edit-button">
                  <i className="edit-icon icon ion-md-create"></i>
                </button>
                <button
                  onClick={() => this.props.onDelete(todo._id)}
                  className="delete-button">
                  <i className="delete-icon icon ion-md-trash"></i>
                </button>
              </div>
            ] : [
              <div className="button-container">
                <button style={{ visibility: 'hidden'}} disabled></button>
                <button
                  onClick={() => this.props.onDelete(todo._id)}
                  className="delete-button">
                  <i className="delete-icon icon ion-md-trash"></i>
                </button>
              </div>
            ]}>
            {editing && currentTodo === todo._id ? (
              <form onSubmit={this.handleSubmit} className="content-container">
                <input
                  autoFocus
                  onChange={this.handleChange}
                  type="text"
                  value={this.state.description}
                  className="update-input"
                />
              </form>
            ) : (
              <div className="content-container" style={{
                textDecoration: (todo.completed) ? "line-through" : ""
              }} onClick={() => this.props.toggleComplete(todo)}>{todo.description}</div>
            )}
          </List.Item>
        )}
      />
    );

    return <div>{todoList}</div>;
  }
}

export default ShowTodos;
