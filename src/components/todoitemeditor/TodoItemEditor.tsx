import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './TodoItemEditor.css';

export class TodoItemEditor extends Component {
  render() {
    return (
      <div className="TodoItemEditor">
        <Link className="TodoItemEditor-link" to="/">
          <span className="TodoItemEditor-close">&times;</span>
        </Link>
        <h2>Todo Item Editor!</h2>
      </div>
    );
  }
}

export default TodoItemEditor;