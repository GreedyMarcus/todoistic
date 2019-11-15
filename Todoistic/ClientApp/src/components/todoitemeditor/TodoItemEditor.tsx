import React, { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Todo } from '../../models/todo';
import { Status } from '../../models/status';
import { EditableTitle } from './editabletitle/EditableTitle';
import { EditableDescription } from './editabledescription/EditableDescription';
import { DuePicker } from './duepicker/DuePicker';
import { Dropdown } from './dropdown/Dropdown';
import './TodoItemEditor.css';

interface State {
  todo: Todo;
  defaultTodoPriority: number;
  defaultTodoStatus: Status;
}

export class TodoItemEditor extends Component<RouteComponentProps<any>, State> {
  state: State = {
    todo: {
      id: 0,
      title: "Fetching todo...",
      description: "",
      due: new Date(),
      status: Status.Todo,
      priority: 1
    },
    defaultTodoPriority: 1,
    defaultTodoStatus: Status.Todo
  }

  componentDidMount() {
    fetch(`https://localhost:44334/api/Todos/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => {
        const fetchedTodo: Todo = data;
        this.setState({
          todo: fetchedTodo,
          defaultTodoPriority: fetchedTodo.priority,
          defaultTodoStatus: fetchedTodo.status
        });
      })
      .catch(error => {
        // TODO: handle error
        console.log("TodoItemEditor couldn't fetch data: ", error);
      });
  }

  handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo: Todo = { ...this.state.todo };
    newTodo.title = e.target.value;
    
    this.setState({ todo: newTodo });
  }

  handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTodo: Todo = { ...this.state.todo };
    newTodo.description = e.target.value;

    this.setState({ todo: newTodo });
  }

  handleDateChange = (date: Date) => {
    const newTodo: Todo = { ...this.state.todo };
    const today = new Date();
    
    // Do not allow past dates
    newTodo.due = date < today ? today : date;
    this.setState({ todo: newTodo });
  }

  handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTodo: Todo = { ...this.state.todo };
    switch (e.target.value) {
      case 'Todo':
          newTodo.status = 0;
          break;
      case 'In progress':
          newTodo.status = 1;
          break;
      case 'Done':
          newTodo.status = 2;
          break;
      case 'Postponed':
          newTodo.status = 3;
          break;
    }
    this.setState({ todo: newTodo });
  }

  handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTodo: Todo = { ...this.state.todo };
    newTodo.priority = parseInt(e.target.value);

    this.setState({ todo: newTodo });
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`https://localhost:44334/api/Todos/${this.state.todo.id}`, {
        method: 'PUT',
        body: JSON.stringify(this.state.todo),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(() => {
        // Redirect to HomeBoard
        this.props.history.push('/');
      })
      .catch(error => {
        // TODO: handle error
        console.log("TodoItemEditor couldn't update data: ", error);
      });
  }

  handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    fetch(`https://localhost:44334/api/Todos/${this.state.todo.id}`, {
        method: 'DELETE'
      })
      .then(() => {
        // Redirect to HomeBoard
        this.props.history.push('/');
      })
      .catch(error => {
        // TODO: handle error
        console.log("TodoItemEditor couldn't delete data: ", error);
      });
  }

  render() {
    const statusOptions = ["Todo", "In progress", "Done", "Postponed"];
    
    return (
      <div className="TodoItemEditor">
        <Link className="TodoItemEditor-link" to="/">
          <span className="TodoItemEditor-close">&times;</span>
        </Link>
        <form onSubmit={this.handleSubmit}>
          <EditableTitle title={this.state.todo.title}
                         handleChange={this.handleTitleChange} />
          <EditableDescription description={this.state.todo.description}
                               handleChange={this.handleDescriptionChange} />
          <div className="TodoItemEditor-container">
            <DuePicker due={this.state.todo.due}
                       handleChange={this.handleDateChange} />
            <Dropdown label="Status"
                      options={statusOptions}
                      defaultOption={statusOptions[this.state.todo.status]}
                      handleChange={this.handleStatusChange}
                      disabled={this.state.todo.priority !== this.state.defaultTodoPriority} />
            <Dropdown label="Priority"
                      options={range(1, this.state.todo.priorityMax)}
                      defaultOption={this.state.todo.priority.toString()}
                      handleChange={this.handlePriorityChange}
                      disabled={this.state.todo.status !== this.state.defaultTodoStatus} />
            <button className="TodoItemEditor-delete" onClick={this.handleDeleteClick}>Delete Todo</button>
          </div>
          <div className="centered">
            <button type="submit" className="TodoItemEditor-save">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

function range(start: number, end: number | undefined) {
  const checkedEnd = end === undefined ? start : end;
  const rangeArr: string[] = [];
  for (let i = start; i <= checkedEnd; i++) {
    rangeArr.push(i.toString());
  }
  return rangeArr;
}

export default TodoItemEditor;