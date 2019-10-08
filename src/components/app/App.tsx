import React from 'react';
import { TodoItem } from '../todoitem/TodoItem';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoItem
        title="Do shopping"
        description="Buy milk, bread, cereal, butter and some vegies."
        due={new Date(2019, 9, 8)}
      />
    </div>
  );
}

export default App;