import React, {Component} from 'react';
import { List } from 'antd';
import '../styles/todo.css';


class ShowTodos extends Component {
    state = {
        editing: false,
        currentTodo: '',
        content: ''
    };
    
    handleEditing = (todo) => {
        const { id, content } = todo;
        
        this.setState({
            editing: true,
            currentTodo: id,
            content,
        })
    }; 


    handleChange = e => {
        this.setState({content: e.target.value})
    };

    handleSubmit = e => {
        e.preventDefault();
        const { content, currentTodo } = this.state;
        this.props.updateTodo(currentTodo, content);
        this.setState({ editing: false, content: '', currentTodo: '' })
    };

    render() {
        const { editing, currentTodo } = this.state;
        const todoList =
            <List size="small" bordered dataSource={this.props.todos} renderItem={todo => 
                <List.Item actions={[
                    <div className="button-container">
                        <button onClick={() => this.handleEditing(todo)} className="edit-button">
                            <i className="edit-icon icon ion-md-create"></i>
                        </button>
                        <button onClick={() => this.props.onDelete(todo)} className="delete-button">
                            <i className="delete-icon icon ion-md-trash"></i>
                        </button> 
                    </div>                                                        
                    ]}>
                    {editing && currentTodo === todo.id ? <form onSubmit={this.handleSubmit} className="content-container">
                    <input autoFocus onChange={this.handleChange} type="text" value={this.state.content} className="update-input"/></form> 
                            : <div className="content-container">{todo.content}</div>}
                </List.Item>}
            />
                        
                        
        return ( 
            <div>
                {todoList}
            </div>
        );
    }
}

export default ShowTodos;




