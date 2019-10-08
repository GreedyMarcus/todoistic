import React from 'react';
import { AddTodo } from '../addtodo/AddTodo';
import { TodoList } from '../todolist/TodoList';
import './TodoTable.css';

export const TodoTable: React.FC<{title: string}> = ({ title }) => {
  return (
    <div className="TodoTable">
      <h1 className="TodoTable-title">{ title }</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}