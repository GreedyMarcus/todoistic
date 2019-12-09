import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../../models/todo';
import { TodoItem } from '../todoitem/TodoItem';
import { Status } from '../../models/status';
import './TodoList.css';

interface Props {
  todos: Todo[];
  status: Status;
}

export const TodoList: React.FC<Props> = ({ todos, status }) => {
  return (
    <Droppable droppableId={status.toString()}>
        {provided => (
          <div className="TodoList"
               {...provided.droppableProps}
               ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <TodoItem key={todo.todoItemID}
                        id={todo.todoItemID}
                        title={todo.title}
                        description={todo.description}
                        due={new Date(todo.due)}
                        index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  );
}