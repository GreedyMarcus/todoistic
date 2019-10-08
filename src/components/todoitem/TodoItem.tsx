import React from 'react';
import './TodoItem.css';

interface Props {
  title: string,
  description: string,
  due?: Date
}

export const TodoItem: React.FC<Props> = ({ title, description, due }) => {
  return (
    <div className="TodoItem">
      <h1 className="TodoItem-title">{ title }</h1>
      <div className="TodoItem-description">{ description }</div>
      {
        due &&
        <span className={`TodoItem-due ${isPostponed(due) && 'TodoItem-postponed'}`}>
          { due.toLocaleDateString() }
        </span>
      }
    </div>
  );
}

function isPostponed(date: Date) {
  const today = new Date();
  
  if (date.getFullYear() < today.getFullYear()) {
    return true;
  }
  else {
    if (date.getMonth() < today.getMonth()) {
      return true;
    }
    else {
      if (date.getDay() < today.getDay()) {
        return true;
      }
    }
  }
  return false;
}