import React, { Component } from "react";

import { List } from "antd";
import "../styles/todo.css";

class CompletedTodos extends Component {
  state = {
    todos: []
  };
	
  render() {
    
    const todoList = (
      <List
        size="small"
        bordered
        dataSource={this.props.todos}
        renderItem={todo => (
          <List.Item
            actions={[
              <div className="button-container">
                <button style={{visibility: "hidden"}}></button>
                <button
                  onClick={() => this.props.onDelete(todo._id)}
                  className="delete-button">
                  <i className="delete-icon icon ion-md-trash"></i>
                </button>
              </div>
            ]}>
              <div className="content-container" style={{
                textDecoration: (todo.completed) ? "line-through" : ""
              }} onClick={() => this.props.toggleComplete(todo)}>{todo.description}</div>
          </List.Item>
        )}
      />
    );

    return <div>{todoList}</div>;
  }
}

export default CompletedTodos;
