import React, { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Todo } from '../../models/todo';
import { Status } from '../../models/status';
import { StatusDTO } from '../../models/statusDTO';
import { EditableTitle } from './editabletitle/EditableTitle';
import { EditableDescription } from './editabledescription/EditableDescription';
import { DuePicker } from './duepicker/DuePicker';
import { Dropdown } from './dropdown/Dropdown';
import { ServiceResponse, fetchSingleTodo, updateTodo, deleteTodo, fetchStatus } from '../../services/apiService';
import './TodoItemEditor.css';

interface State {
  todo: Todo;
  initialPriority: number;
  initialStatus: Status;
  statusOptions: StatusDTO[];
  isLoading: boolean;
  error?: Error;
}

export class TodoItemEditor extends Component<RouteComponentProps<any>, State> {
  state: State = {
    todo: {
      todoItemID: 0,
      title: "",
      description: "",
      due: new Date(),
      statusID: 0,
      priority: 1
    },
    initialPriority: 1,
    initialStatus: Status.Todo,
    statusOptions: [],
    isLoading: true
  }

  async componentDidMount() {
    const todoId = this.props.match.params.id;
    const todoResponse: ServiceResponse<Todo> = await fetchSingleTodo(todoId);
    const statusResponse: ServiceResponse<StatusDTO[]> = await fetchStatus();

    this.setState({
      todo: todoResponse.data,
      initialPriority: todoResponse.data.priority,
      initialStatus: todoResponse.data.statusID,
      statusOptions: statusResponse.data,
      isLoading: false,
      error: todoResponse.error ? todoResponse.error : statusResponse.error
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

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todo: Todo = { ...this.state.todo };
    const response: ServiceResponse<Todo> = await updateTodo(todo);

    if (response.error) {
      this.setState({ error: response.error });
    }
    else {
      // Redirect to HomeBoard
      this.props.history.push('/');
    }
  }

  handleDeleteClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const todo = { ...this.state.todo };
    const response: ServiceResponse<{}> = await deleteTodo(todo.todoItemID);

    if (response.error) {
      this.setState({ error: response.error });
    }
    else {
      // Redirect to HomeBoard}
      this.props.history.push('/');
    }
  }

  render() {
    if (this.state.error) {
      // TODO: Display nicer error messages
      return (<div>Error: {this.state.error.message}</div>);
    }
    else if (this.state.isLoading) {
      // TODO: Dispaly some kind of spinner
      return (<div>Loading...</div>);
    }
    else {
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
}

function range(start: number, end: number, needPlusOne: boolean) {
  const rangeArr: string[] = [];
  if (end === 0) {
    rangeArr.push('1');
  }
  else {
    const extra = needPlusOne ? 1 : 0;
    for (let i = start; i <= end + extra; i++) {
      rangeArr.push(i.toString());
    }
  }
  return rangeArr;
}

export default TodoItemEditor;