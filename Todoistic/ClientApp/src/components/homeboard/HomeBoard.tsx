import React, { Component } from 'react';
import { Todo } from '../../models/todo';
import { Status } from '../../models/status';
import { TodoTable } from '../todotable/TodoTable';
import './HomeBoard.css';

interface State {
  todos: Todo[];
}

export class HomeBoard extends Component<{}, State> {
  state: State = {
    todos: []
  }

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/GreedyMarcus/mock-backend/todos')
      .then(response => response.json())
      .then(data => {
        // Convert raw data to Todo Array type
        const fetchedTodos: Todo[] = data;
        this.setState({ todos: fetchedTodos });
      })
      .catch(error => {
        // TODO: handle error
        console.log("HomeBoard couldn't fetch data: ", error);
      });
  }

  addTodo = (title: string, status: Status) => {    
    const requestBody = {
      title: title,
      description: "",
      due: new Date(),
      status: status,
      priority: this.state.todos.filter(todo => todo.status === status).length + 1
    }

    // Create resource
    fetch('https://my-json-server.typicode.com/GreedyMarcus/mock-backend/todos', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(data => {
        // Convert raw data to Todo type
        const newTodo: Todo = data;
        this.setState(state => ({
          todos: [...state.todos, newTodo]
        }));
      })
      .catch(error => {
        // TODO: handle error
        console.log("HomeBoard couldn't create resource: ", error);
      });
  }

  render() {
    return (
      <div className="HomeBoard">
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
      </div>
    );
  }
}

export default HomeBoard;