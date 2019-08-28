import React, { Component } from 'react';
import ShowTodos from './ShowTodos';
import AddTodo from './AddTodo';
import '../styles/todo.css';

class Todo extends Component {
    state = { 
        todos: [
            {id:"1", content:"Water the plants.", editing: false},
            {id:"2", content:"Have some coffee.", editing: false}
        ]
    };

    deleteTodo = (t) => {
        const todos = this.state.todos.filter(todo => todo.id !== t.id );
        this.setState({
            todos
        })
    };

    addTodo = (todo) => {
        todo.id = Math.random()
        const todos = [...this.state.todos, todo]
        this.setState({
            todos
        })
    };

    updateTodo = (currentTodo, content) => {
        // console.log("TODO", todo)
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === currentTodo) {
                    return {
                        ...todo,
                        content,
                    }
                }
                return todo;
            })
        })
    };

    render() { 
        return ( 
            <div className="todo-container">
                <h1 className="heading">Todos</h1>
                <ShowTodos todos={this.state.todos} onDelete={this.deleteTodo} updateTodo={this.updateTodo} />
                <AddTodo addTodo={this.addTodo} />
                <p className="how-to">Created by Ramiz Ahmed</p>
            </div>
        );
    }
}

export default Todo;