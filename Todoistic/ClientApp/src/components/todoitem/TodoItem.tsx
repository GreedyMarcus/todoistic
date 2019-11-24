import React from 'react';
import { Link } from 'react-router-dom';
import './TodoItem.css';

interface Props {
  id: number;
  title: string;
  description: string;
  due: Date;
}

export const TodoItem: React.FC<Props> = ({ id, title, description, due }) => {
  return (
    <Link className="TodoItem-link" to={`/todos/${id}`}>
      <div className="TodoItem">
        <h1 className="TodoItem-title">{title}</h1>
        <div className="TodoItem-description">{description}</div>
        <span className={`TodoItem-due ${isPostponed(due) && 'TodoItem-postponed'}`}>
          { due.toLocaleDateString() }
        </span>
      </div>
    </Link>
  );
}

function isPostponed(date: Date) {
  const today = new Date();
  return date.getFullYear() <= today.getFullYear() &&
         date.getMonth() <= today.getMonth() &&
         date.getDate() < today.getDate();
}