import React from 'react';
import { Todo } from '../../models/todo';
import { TodoItem } from '../todoitem/TodoItem';
import './TodoList.css';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  description={todo.description}
                  due={new Date(todo.due)} />
      ))}
    </div>
  );
}