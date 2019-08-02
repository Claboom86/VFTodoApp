import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

const Todo = ({ todo, handleDelete, changeTodoCompleted }) => {
    return (
        <div className="todo-single-div">
            <button onClick={() => changeTodoCompleted(todo)}><FontAwesomeIcon icon={faCheck} /></button>
            <div className={(todo.todo_completed ? 'completed' : 'none')}>{todo.todo_description}</div>
            <button onClick={() => handleDelete(todo._id)}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
    );
};

export default Todo;

