import React from 'react';
import { TodoItem } from '../todoitem/TodoItem';
import './TodoList.css';

export const TodoList: React.FC = () => {
  return (
    <div className="TodoList">
      <TodoItem
        title="Do shopping"
        description="Buy milk, bread, cereal, butter and some vegies."
        due={new Date(2019, 9, 8)}
      />
      <TodoItem
        title="Do shopping"
        description="Buy milk, bread, cereal, butter and some vegies."
        due={new Date(2019, 9, 8)}
      />
      <TodoItem
        title="Do shopping"
        description="Buy milk, bread, cereal, butter and some vegies."
        due={new Date(2019, 9, 8)}
      />
    </div>
  );
}