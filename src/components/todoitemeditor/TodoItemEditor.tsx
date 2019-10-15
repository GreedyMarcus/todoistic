import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { EditableTitle } from './editabletitle/EditableTitle';
import './TodoItemEditor.css';

export class TodoItemEditor extends Component {
  render() {
    return (
      <div className="TodoItemEditor">
        <Link className="TodoItemEditor-link" to="/">
          <span className="TodoItemEditor-close">&times;</span>
        </Link>
        <EditableTitle title="Do shopping" />
      </div>
    );
  }
}

export default TodoItemEditor;