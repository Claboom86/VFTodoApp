import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTodo from './components/CreateTodo';
import TodosList from './components/TodosList';

function App() {
  return (
    <Router>
      <div className="container">
        <div className="title-div">
          <Link to="/" className="title">Todo App</Link>
        </div>
        <Route path="/" exact component={TodosList} />
        <Route path="/create" component={CreateTodo} />
      </div>
    </Router>
  );
}

export default App;
