import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Todo } from '../../models/todo';
import { Status } from '../../models/status';
import { TodoTable } from '../todotable/TodoTable';
import { TodoItemEditor } from '../todoitemeditor/TodoItemEditor';
import './App.css';

interface State {
  todos: Todo[];
}

class App extends Component<{}, State> {
  state: State = {
    todos: []
  }

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/GreedyMarcus/mock-backend/todos')
      .then(response => response.json())
      .then(data => {
        const todos: Array<Todo> = data;
        this.setState({ todos: todos });
      });
  }

  addTodo = (title: string, status: Status) => {
    // Init status can only be 'In progress' or 'Todo'
    const initStatus = status === Status.InProgress ? Status.InProgress : Status.Todo;
    
    const newTodo: Todo = {
      id: this.state.todos.length + 1,
      title: title,
      description: "",
      due: new Date(),
      status: initStatus,
      priority: this.state.todos.filter(todo => todo.status === initStatus).length + 1
    }

    // Create resource
    fetch('https://my-json-server.typicode.com/GreedyMarcus/mock-backend/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(json => console.log(json));

    
    this.setState(state => ({
      todos: [...state.todos, newTodo]
    }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={props => (
            <React.Fragment>
              <TodoTable title="Todo"
                         status={Status.Todo}
                         todos={this.state.todos.filter(todo => todo.status === Status.Todo)}
                         addTodo={this.addTodo} />
              <TodoTable title="In progress"
                         status={Status.InProgress}
                         todos={this.state.todos.filter(todo => todo.status === Status.InProgress)}
                         addTodo={this.addTodo} />
              <TodoTable title="Done"
                         status={Status.Done}
                         todos={this.state.todos.filter(todo => todo.status === Status.Done)}
                         addTodo={this.addTodo} />
              <TodoTable title="Postponed"
                         status={Status.Postponed}
                         todos={this.state.todos.filter(todo => todo.status === Status.Postponed)}
                         addTodo={this.addTodo} />
            </React.Fragment>
          )} />
          <Route path="/todos/:id" component={TodoItemEditor} />
        </div>
      </Router>
    );
  }
}

export default App;