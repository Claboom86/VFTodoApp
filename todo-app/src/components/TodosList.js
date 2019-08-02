import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Todo from './Todo';

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.getTodos = this.getTodos.bind(this);
        this.filterActive = this.filterActive.bind(this);
        this.filterCompleted = this.filterCompleted.bind(this);
        this.filterAll = this.filterAll.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.changeTodoCompleted = this.changeTodoCompleted.bind(this);
        this.state = {
            todos: [],
            filteredTodos: [],
            totalActive: 0
        };
    }

    getTodos() {
        axios.get('http://localhost:4000/todos')
            .then(response => {
                this.setState({ todos: response.data, filteredTodos: response.data }, () => {
                    let count = 0;
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].todo_completed === false) {
                            count++;
                            this.setState({ totalActive: count })
                        }
                        this.setState({ totalActive: count });
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getTodos();
    }

    filterActive() {
        const filteredList = this.state.todos.filter(todo => {
            return todo.todo_completed === false;
        });
        this.setState({ filteredTodos: filteredList });
    }

    filterCompleted() {
        const filteredList = this.state.todos.filter(todo => {
            return todo.todo_completed;
        });
        this.setState({ filteredTodos: filteredList });
    }

    filterAll() {
        this.setState({ filteredTodos: this.state.todos });
    }

    handleDelete(_id) {
        axios.delete('http://localhost:4000/todos/delete/' + _id)
            .then(res => {
                this.getTodos();
            });
    }

    deleteAll() {
        axios.delete('http://localhost:4000/todos/deleteAll')
            .then(res => {
                this.getTodos();
                this.setState({ totalActive: 0 });
            });
    }

    changeTodoCompleted(todo) {
        const obj = {
            todo_description: todo.todo_description,
            todo_completed: !todo.todo_completed
        };
        axios.post('http://localhost:4000/todos/update/' + todo._id, obj)
            .then(res => {
                this.getTodos();
            })
    }

    render() {
        return (
            <div className="list-container">
                <div>
                    <p className="active">Total Active: {this.state.totalActive}</p>
                </div>
                <div className="btn-div">
                    <Link to="/create" ><FontAwesomeIcon className="create-btn" size="2x" color="black" icon={faPlus} /></Link>
                    <button className="btn btn-info btn-secondary" onClick={this.filterActive}>Active</button>
                    <button className="btn btn-info btn-secondary" onClick={this.filterCompleted}>Completed</button>
                    <button className="btn btn-info btn-secondary" onClick={this.filterAll}>All</button>
                    <button className="btn btn-danger" onClick={this.deleteAll}>Delete All</button>
                </div>
                {
                    this.state.filteredTodos.map((todo, index) => (
                        <div><Todo todo={todo} handleDelete={this.handleDelete} changeTodoCompleted={this.changeTodoCompleted} key={index} />
                        </div>
                    ))
                }
            </div >);
    }
}