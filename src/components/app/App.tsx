import React from 'react';
import { TodoTable } from '../todotable/TodoTable';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoTable title="In progress" />
      <TodoTable title="In progress" />
      <TodoTable title="In progress" />
      <TodoTable title="In progress" />
    </div>
  );
}

export default App;