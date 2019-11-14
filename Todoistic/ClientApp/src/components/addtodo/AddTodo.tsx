import React, { Component } from 'react';
import { Status } from '../../models/status';
import './AddTodo.css';

interface Props {
  todoStatus: Status;
  addTodo: (title: string, status: Status) => void;
}

interface State {
  title: string;
}

export class AddTodo extends Component<Props, State> {
  state: State = {
    title: ''
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value });
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (this.state.title !== '') {
      this.props.addTodo(this.state.title, this.props.todoStatus);
      this.setState({ title: '' });
    }
  }
  
  render() {
    return (
      <div className="AddTodo">
        <form onSubmit={this.handleSubmit}>
          <input className="AddTodo-input" type="text" placeholder="What's your task?"
                 value={this.state.title}
                 onChange={this.handleChange} />
          <input className="AddTodo-submit" type="submit" value="Add Todo" />
        </form>
      </div>
    );
  }
}

export default AddTodo;