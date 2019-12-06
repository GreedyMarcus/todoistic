import React, { Component } from 'react';
import { Todo } from '../../models/todo';
import { Status } from '../../models/status';
import { TodoTable } from '../todotable/TodoTable';
import { ErrorPage } from '../errorpage/ErrorPage';
import { ServiceResponse, fetchTodos, postTodo } from '../../services/apiService';
import './HomeBoard.css';

interface State {
  todos: Todo[];
  isLoading: boolean;
  error?: Error;
}

export class HomeBoard extends Component<{}, State> {
  state: State = {
    todos: [],
    isLoading: true
  }

  async componentDidMount() {
    const response: ServiceResponse<Todo[]> = await fetchTodos();

    this.setState({
      todos: response.data,
      isLoading: false,
      error: response.error
    });
  }

  addTodo = async (title: string, status: Status) => {    
    const newTodo: Todo = {
      todoItemID: 0,
      title: title,
      description: "",
      due: new Date(),
      statusID: status,
      priority: this.state.todos.filter(todo => todo.statusID === status).length + 1
    }

    const response: ServiceResponse<Todo> = await postTodo(newTodo);

    this.setState(state => ({
      todos: [...state.todos, response.data],
      error: response.error
    }));
  }

  render() {
    if (this.state.error) {
      return <ErrorPage errorMessage={this.state.error.message} />;
    }
    else if (this.state.isLoading) {
      // TODO: Dispaly some kind of spinner
      return (<div>Loading...</div>);
    }
    else {
      const { todos } = this.state;

      return (
        <div className="HomeBoard">
          <TodoTable title="Todo"
                     status={Status.Todo}
                     todos={todos.filter(todo => todo.statusID === Status.Todo)}
                     addTodo={this.addTodo} />
          <TodoTable title="In progress"
                     status={Status.InProgress}
                     todos={todos.filter(todo => todo.statusID === Status.InProgress)}
                     addTodo={this.addTodo} />
          <TodoTable title="Done"
                     status={Status.Done}
                     todos={todos.filter(todo => todo.statusID === Status.Done)}
                     addTodo={this.addTodo} />
          <TodoTable title="Postponed"
                     status={Status.Postponed}
                     todos={todos.filter(todo => todo.statusID === Status.Postponed)}
                     addTodo={this.addTodo} />
        </div>
      );
    }
  }
}

export default HomeBoard;