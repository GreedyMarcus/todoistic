import React from 'react';
import './AddTodo.css';

export const AddTodo: React.FC = () => {
  return (
    <div className="AddTodo">
      <form>
        <input className="AddTodo-input" type="text" placeholder="What's your task?" />
        <input className="AddTodo-submit" type="submit" value="Add Todo" />
      </form>
    </div>
  );
}