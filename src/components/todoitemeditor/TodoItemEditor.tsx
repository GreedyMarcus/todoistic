import React, { Component } from 'react';
import { Todo } from '../../models/todo';
import { Link } from 'react-router-dom';
import { EditableTitle } from './editabletitle/EditableTitle';
import { EditableDescription } from './editabledescription/EditableDescription';
import { Dropdown } from './dropdown/Dropdown';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './TodoItemEditor.css';

interface Props {
  todo: Todo;
  priorityOptions: number[];
}

interface State {
  todo: Todo;
}

export class TodoItemEditor extends Component<Props, State> {
  state: State = {
    todo: this.props.todo
  };
  
  handleDateChange = (date: Date) => {
    const todo = this.state.todo;
    todo.due = new Date(date);
    this.setState({ todo: todo});
  };

  render() {
    const statusOptions = ["Todo", "In progress", "Done", "Postponed"];
    const priorityOptions = this.props.priorityOptions.map(priority => priority.toString());
    
    return (
      <div className="TodoItemEditor">
        <Link className="TodoItemEditor-link" to="/">
          <span className="TodoItemEditor-close">&times;</span>
        </Link>
        <EditableTitle title={this.state.todo.title} />
        <EditableDescription description={this.state.todo.description} />
        <div className="TodoItemEditor-grid-container">
          <div>
            <h3 className="TodoItemEditor-title">Due</h3>
            <DatePicker className="TodoItemEditor-datepicker"
                        isClearable
                        selected={new Date(this.state.todo.due)}
                        onChange={this.handleDateChange}
                        dateFormat="yyyy. MM. dd"
                        placeholderText="Click to select due date" />
          </div>
          <div>
            <h3 className="TodoItemEditor-title">Status</h3>
            <Dropdown options={statusOptions} defaultOption={statusOptions[this.state.todo.status]} />
          </div>
          <div>
            <h3 className="TodoItemEditor-title">Priority</h3>
            <Dropdown options={priorityOptions} defaultOption={this.state.todo.priority.toString()} />
          </div>
          <button className="TodoItemEditor-delete">Delete Todo</button>
        </div>
        <div className="centered">
          <button className="TodoItemEditor-save">Save</button>
        </div>
      </div>
    );
  }
}

export default TodoItemEditor;