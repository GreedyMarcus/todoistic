import React from 'react';
import { AddTodo } from '../addtodo/AddTodo';
import { TodoList } from '../todolist/TodoList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;