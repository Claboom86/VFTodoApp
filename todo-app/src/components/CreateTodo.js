import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';

export default class CreateTodo extends Component {
    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_completed: false
        }
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);

        const newTodo = {
            todo_description: this.state.todo_description,
            todo_completed: this.state.todo_completed
        }

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => {
                console.log(res.data);
                this.setState({
                    todo_description: '',
                    todo_completed: false
                });
                this.props.history.push('/');
            });

    }

    render() {
        return (
            <div>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" value={this.state.todo_description} onChange={this.onChangeTodoDescription}></input>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        )
    }
}