import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { EditableTitle } from './editabletitle/EditableTitle';
import { EditableDescription } from './editabledescription/EditableDescription';
import './TodoItemEditor.css';

export class TodoItemEditor extends Component {
  render() {
    return (
      <div className="TodoItemEditor">
        <Link className="TodoItemEditor-link" to="/">
          <span className="TodoItemEditor-close">&times;</span>
        </Link>
        <EditableTitle title="Do shopping" />
        <EditableDescription description="Buy milk, bread, cereal, butter and some vegies." />
      </div>
    );
  }
}

export default TodoItemEditor;