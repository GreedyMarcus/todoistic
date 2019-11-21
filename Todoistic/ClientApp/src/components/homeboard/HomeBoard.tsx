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
    fetch('http://localhost:62093/api/Todos')
      .then(response => response.json())
      .then(data => {
        const fetchedTodos: Todo[] = data;
        this.setState({ todos: fetchedTodos });
      })
      .catch(error => {
        // TODO: handle error
        console.log("HomeBoard couldn't fetch data: ", error);
      });
  }

  addTodo = (title: string, status: Status) => {    
    const priority: number = this.state.todos.filter(todo => todo.statusID === status).length + 1;
    
    const requestBody = {
      title: title,
      description: "",
      due: new Date(),
      statusID: status,
      priority: priority
    }

    fetch('http://localhost:62093/api/Todos', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(data => {
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
                   todos={this.state.todos.filter(todo => todo.statusID === Status.Todo)}
                   addTodo={this.addTodo} />
        <TodoTable title="In progress"
                   status={Status.InProgress}
                   todos={this.state.todos.filter(todo => todo.statusID === Status.InProgress)}
                   addTodo={this.addTodo} />
        <TodoTable title="Done"
                   status={Status.Done}
                   todos={this.state.todos.filter(todo => todo.statusID === Status.Done)}
                   addTodo={this.addTodo} />
        <TodoTable title="Postponed"
                   status={Status.Postponed}
                   todos={this.state.todos.filter(todo => todo.statusID === Status.Postponed)}
                   addTodo={this.addTodo} />
      </div>
    );
  }
}

export default HomeBoard;