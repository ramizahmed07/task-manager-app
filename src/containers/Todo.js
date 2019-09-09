import React, { Component } from "react";
import ShowTodos from "./ShowTodos";
import AddTodo from "./AddTodo";
import axios from "axios";
import "../styles/todo.css";

class Todo extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios
      .get("https://node-task-manager-app.herokuapp.com/api/tasks")
      .then(response =>
        this.setState({
          todos: response.data.map(t => t)
        })
      )
      .catch(er => er);
  }

    toggleComplete = (todo) => {
    axios.patch(`https://node-task-manager-app.herokuapp.com/api/tasks/${todo._id}`, {completed: !todo.completed})
    .then(response => {
      let newTodo = response.data
      const todos = [...this.state.todos];
      const index = todos.findIndex(t => t._id === response.data._id)
      todos.splice(index, 1, {...this.state.todos, ...newTodo})
      this.setState({
        todos: todos
      })
    })
    .catch(er => console.log({er}));
  };

  deleteTodo = (t) => {
    axios.delete(`https://node-task-manager-app.herokuapp.com/api/tasks/${t}`)
    .then(response => {
      const todos = [...this.state.todos].filter(res => res._id !== t);
      this.setState({todos})
    })
    .catch(er => console.log(er));
  };

  addTodo = (todo) => {
    todo.id = Math.random()
    axios
      .post("https://node-task-manager-app.herokuapp.com/api/tasks", {
        description: todo.content
      }).then(response => {
        const todos = [...this.state.todos, response.data]
        this.setState({todos})
      });
      
  };

  updateTodo = (todo) => {
    axios.patch(`https://node-task-manager-app.herokuapp.com/api/tasks/${todo.currentTodo}`, {description: todo.description })
    .then(response => {
      let newTodo = response.data
      const todos = [...this.state.todos];
      const index = todos.findIndex(t => t._id === response.data._id)
      todos.splice(index, 1, {...this.state.todos, ...newTodo})
      this.setState({
        todos: todos
      })
    })
    .catch(er => console.log({er}));
  };

  render() {
    return (
      <div className="todo-container">
        <h3 className="heading">
          
        </h3>
        <ShowTodos
          todos={this.state.todos.filter(todo => todo.completed === false)}
          onDelete={this.deleteTodo}
          updateTodo={this.updateTodo}
          toggleComplete={this.toggleComplete}
        />
        <AddTodo addTodo={this.addTodo} />
        <ShowTodos
          todos={this.state.todos.filter(todo => todo.completed)}
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
