import React, { Component } from 'react';
import { Todo } from '../../models/todo';
import { Status } from '../../models/status';
import { TodoTable } from '../todotable/TodoTable';
import './App.css';

interface State {
  todos: Todo[];
}

class App extends Component<{}, State> {
  state: State = {
    todos: [
      {
        id: 1,
        title: "Do shopping",
        description: "Buy milk, bread, cereal, butter and some vegies.",
        due: new Date(2019, 9, 12),
        status: Status.Todo,
        priority: 1
      },
      {
        id: 2,
        title: "Finish history assignment",
        description: "Write an essay about Napoleon.",
        due: new Date(2019, 9, 15),
        status: Status.InProgress,
        priority: 1
      }
    ]
  }

  addTodo = (title: string, status: Status) => {
    const newTodo: Todo = {
      id: this.state.todos.length + 1,
      title: title,
      description: "",
      due: new Date(),
      status: status,
      priority: this.state.todos.filter(todo => todo.status === status).length + 1
    }
    
    this.setState(state => ({
      todos: [...state.todos, newTodo]
    }));
  }

  render() {
    return (
      <div className="App">
        <TodoTable title="Todo"
                   status={Status.Todo}
                   todos={this.state.todos}
                   addTodo={this.addTodo} />
        <TodoTable title="In progress"
                   status={Status.InProgress}
                   todos={this.state.todos}
                   addTodo={this.addTodo} />
        <TodoTable title="Done"
                   status={Status.Done}
                   todos={this.state.todos}
                   addTodo={this.addTodo} />
        <TodoTable title="Postponed"
                   status={Status.Postponed}
                   todos={this.state.todos}
                   addTodo={this.addTodo} />
      </div>
    );
  }
}

export default App;