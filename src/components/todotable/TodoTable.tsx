import React, { Component } from 'react';
import { Todo } from '../../models/todo';
import { Status } from '../../models/status';
import { AddTodo } from '../addtodo/AddTodo';
import { TodoList } from '../todolist/TodoList';
import './TodoTable.css';

interface Props {
  title: string;
  status: Status;
  todos: Todo[];
  addTodo: (title: string, status: Status) => void;
}

export class TodoTable extends Component<Props, {}> {
  addTodo = (title: string) => {
    this.props.addTodo(title, this.props.status);
  }
  
  render() {
    return (
      <div className="TodoTable">
        <h1 className="TodoTable-title">{ this.props.title }</h1>
        <AddTodo addTodo={this.addTodo}/>
        <TodoList todos={this.props.todos} />
      </div>
    );
  }
}

export default TodoTable;