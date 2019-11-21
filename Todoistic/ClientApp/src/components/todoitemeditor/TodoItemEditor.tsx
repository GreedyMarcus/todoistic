import React, { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Todo } from '../../models/todo';
import { Status } from '../../models/status';
import { EditableTitle } from './editabletitle/EditableTitle';
import { EditableDescription } from './editabledescription/EditableDescription';
import { DuePicker } from './duepicker/DuePicker';
import { Dropdown } from './dropdown/Dropdown';
import './TodoItemEditor.css';

interface StatusDTO {
  statusID: number;
  title: string;
  todosNumber: number;
}

interface State {
  todo: Todo;
  initialPriority: number;
  initialStatus: Status;
  statusOptions: StatusDTO[];
}

export class TodoItemEditor extends Component<RouteComponentProps<any>, State> {
  state: State = {
    todo: {
      todoItemID: 0,
      title: "Fetching todo...",
      description: "",
      due: new Date(),
      statusID: Status.Todo,
      priority: 1
    },
    initialPriority: 1,
    initialStatus: Status.Todo,
    statusOptions: []
  }

  componentDidMount() {
    fetch(`http://localhost:62093/api/Todos/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => {
        const fetchedTodo: Todo = data;
        this.setState({
          todo: fetchedTodo,
          initialPriority: fetchedTodo.priority,
          initialStatus: fetchedTodo.statusID,
        });
      })
      .catch(error => {
        // TODO: handle error
        console.log("TodoItemEditor couldn't fetch todo data: ", error);
      });

    fetch('http://localhost:62093/api/Status')
      .then(response => response.json())
      .then(data => {
        const fetchedStatus: StatusDTO[] = data;
        this.setState({
          statusOptions: fetchedStatus
        });
      })
      .catch(error => {
        // TODO: handle error
        console.log("TodoItemEditor couldn't fetch status data: ", error);
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
          newTodo.statusID = 0;
          break;
      case 'In progress':
          newTodo.statusID = 1;
          break;
      case 'Done':
          newTodo.statusID = 2;
          break;
      case 'Postponed':
          newTodo.statusID = 3;
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

    fetch(`http://localhost:62093/api/Todos/${this.state.todo.todoItemID}`, {
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

    fetch(`http://localhost:62093/api/Todos/${this.state.todo.todoItemID}`, {
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
    return (
      <div className="TodoItemEditor">
        {this.state.statusOptions.length > 0 &&
          <React.Fragment>
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
                          options={this.state.statusOptions.map(status => status.title)}
                          defaultOption={this.state.statusOptions[this.state.todo.statusID].title}
                          handleChange={this.handleStatusChange} />
                <Dropdown label="Priority"
                          options={range(1, this.state.statusOptions[this.state.todo.statusID].todosNumber, this.state.initialStatus !== this.state.todo.statusID)}
                          defaultOption={this.state.todo.priority.toString()}
                          handleChange={this.handlePriorityChange} />
                <button className="TodoItemEditor-delete" onClick={this.handleDeleteClick}>Delete Todo</button>
              </div>
              <div className="centered">
                <button type="submit" className="TodoItemEditor-save">Save</button>
              </div>
            </form>
          </React.Fragment>
        }
      </div>
    );
  }
}

function range(start: number, end: number, needPlusOne: boolean) {
  const rangeArr: string[] = [];
  if (end === 0) {
    rangeArr.push('1');
  }
  else {
    const extra = needPlusOne ? 1 : 0;
    console.log(extra);
    for (let i = start; i <= end + extra; i++) {
      rangeArr.push(i.toString());
    }
  }
  return rangeArr;
}

export default TodoItemEditor;