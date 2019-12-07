import React from 'react';
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import './TodoItem.css';

interface Props {
  id: number;
  title: string;
  description: string;
  due: Date;
  priority: number;
}

export const TodoItem: React.FC<Props> = ({ id, title, description, due, priority }) => {
  return (
    <Link className="TodoItem-link" to={`/todos/${id}`}>
      <Draggable draggableId={id.toString()} index={priority}>
          {provided => (
            <div className="TodoItem"
                 {...provided.draggableProps}
                 {...provided.dragHandleProps}
                 ref={provided.innerRef}>
              <h1 className="TodoItem-title">{title}</h1>
              <div className="TodoItem-description">{description}</div>
              <span className={`TodoItem-due ${isPostponed(due) && 'TodoItem-postponed'}`}>
                {due.toLocaleDateString()}
              </span>
            </div>
          )}
        </Draggable>
    </Link>
  );
}

function isPostponed(date: Date) {
  const today = new Date();
  return date.getFullYear() <= today.getFullYear() &&
         date.getMonth() <= today.getMonth() &&
         date.getDate() < today.getDate();
}