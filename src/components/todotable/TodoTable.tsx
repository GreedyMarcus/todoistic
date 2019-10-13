import React from 'react';
import { Todo } from '../../models/todo';
import { Status } from '../../models/status';
import { AddTodo } from '../addtodo/AddTodo';
import { TodoList } from '../todolist/TodoList';
import './TodoTable.css';

interface Props {
  title: string;
  status: Status;
  todos: Todo[];
}

export const TodoTable: React.FC<Props> = ({ title, status, todos }) => {
  return (
    <div className="TodoTable">
      <h1 className="TodoTable-title">{ title }</h1>
      <AddTodo />
      <TodoList todos={todos.filter(todo => todo.status === status)} />
    </div>
  );
}