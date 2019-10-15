import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { EditableTitle } from './editabletitle/EditableTitle';
import { EditableDescription } from './editabledescription/EditableDescription';
import { Dropdown } from './dropdown/Dropdown';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './TodoItemEditor.css';

export class TodoItemEditor extends Component {
  state = {
    due: new Date()
  };
  
  handleDateChange = (date: Date) => {
    this.setState({ due: date });
  };

  render() {
    return (
      <div className="TodoItemEditor">
        <Link className="TodoItemEditor-link" to="/">
          <span className="TodoItemEditor-close">&times;</span>
        </Link>
        <EditableTitle title="Do shopping" />
        <EditableDescription description="Buy milk, bread, cereal, butter and some vegies." />
        <div className="TodoItemEditor-grid-container">
          <div>
            <h3 className="TodoItemEditor-title">Due</h3>
            <DatePicker className="TodoItemEditor-datepicker"
                        isClearable
                        selected={this.state.due}
                        onChange={this.handleDateChange}
                        dateFormat="yyyy. MM. dd"
                        placeholderText="Click to select due date" />
          </div>
          <div>
            <h3 className="TodoItemEditor-title">Status</h3>
            <Dropdown options={["Todo", "In progress", "Done", "Postponed"]} defaultOption={"Todo"} />
          </div>
          <div>
            <h3 className="TodoItemEditor-title">Priority</h3>
            <Dropdown options={["1", "2", "3", "4"]} defaultOption={"1"} />
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