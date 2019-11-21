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
      {todos.sort(compareTodosPriority).map(todo => (
        <TodoItem key={todo.todoItemID}
                  id={todo.todoItemID}
                  title={todo.title}
                  description={todo.description}
                  due={new Date(todo.due)} />
      ))}
    </div>
  );
}

function compareTodosPriority(first: Todo, second: Todo) {
  if (first.priority < second.priority) {
    return -1;
  }
  if (first.priority > second.priority) {
    return 1;
  }
  return 0;
}