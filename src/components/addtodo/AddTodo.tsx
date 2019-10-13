import React, { Component } from 'react';
import './AddTodo.css';

interface Props {
  addTodo: (title: string) => void;
}

export class AddTodo extends Component<Props, {}> {
  state = {
    title: ""
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (this.state.title !== '') {
      this.props.addTodo(this.state.title);
      this.setState({ title: '' });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value });
  }
  
  render() {
    return (
      <div className="AddTodo">
        <form onSubmit={this.handleSubmit}>
          <input className="AddTodo-input"
                 type="text"
                 placeholder="What's your task?"
                 value={this.state.title}
                 onChange={this.handleChange} />
          <input className="AddTodo-submit"
                 type="submit"
                 value="Add Todo" />
        </form>
      </div>
    );
  }
}

export default AddTodo;