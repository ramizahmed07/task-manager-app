import React, { Component } from 'react';
import axios from 'axios';
import ShowTodos from './ShowTodos';
import AddTodo from './AddTodo';
import '../styles/todo.css';

class Todo extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios
      .get('https://node-task-manager-app.herokuapp.com/api/tasks')
      .then(response =>
        this.setState({
          todos: response.data.map(t => t)
        })
      )
      .catch(er => er);
  }

  toggleComplete = todo => {
    axios
      .patch(
        `https://node-task-manager-app.herokuapp.com/api/tasks/${todo._id}`,
        { completed: !todo.completed }
      )
      .then(response => {
        const { todos } = this.state;

        const newTodo = response.data;
        const todoList = [...todos];
        const index = todoList.findIndex(t => t._id === response.data._id);
        todoList.splice(index, 1, { ...todos, ...newTodo });
        this.setState({
          todos: todoList
        });
      })
      .catch(er => console.log({ er }));
  };

  deleteTodo = t => {
    axios
      .delete(`https://node-task-manager-app.herokuapp.com/api/tasks/${t}`)
      .then(response => {
        const { todos } = this.state;
        const todoList = [...todos].filter(res => res._id !== t);
        this.setState({ todos: todoList });
      })
      .catch(er => console.log(er));
  };

  addTodo = todo => {
    todo.id = Math.random();
    axios
      .post('https://node-task-manager-app.herokuapp.com/api/tasks', {
        description: todo.content
      })
      .then(response => {
        const { todos } = this.state;
        const todoList = [...todos, response.data];
        this.setState({ todos: todoList });
      });
  };

  updateTodo = todo => {
    axios
      .patch(
        `https://node-task-manager-app.herokuapp.com/api/tasks/${todo.currentTodo}`,
        { description: todo.description }
      )
      .then(response => {
        const newTodo = response.data;
        const { todos } = this.state;
        const todoList = [...todos];
        const index = todoList.findIndex(t => t._id === response.data._id);
        todoList.splice(index, 1, { ...todos, ...newTodo });
        this.setState({
          todos: todoList
        });
      })
      .catch(er => console.log({ er }));
  };

  render() {
    const { todos } = this.state;
    return (
      <div className="todo-container">
        <ShowTodos
          todos={todos.filter(todo => todo.completed === false)}
          onDelete={this.deleteTodo}
          updateTodo={this.updateTodo}
          toggleComplete={this.toggleComplete}
        />
        <AddTodo addTodo={this.addTodo} />
        <ShowTodos
          todos={todos.filter(todo => todo.completed)}
          onDelete={this.deleteTodo}
          updateTodo={this.updateTodo}
          toggleComplete={this.toggleComplete}
          showCompleted
        />
      </div>
    );
  }
}

export default Todo;
