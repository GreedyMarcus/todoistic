import React, { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Todo } from '../../models/todo';
import { Status } from '../../models/status';
import { StatusDTO } from '../../models/statusDTO';
import { EditableTitle } from './editabletitle/EditableTitle';
import { EditableDescription } from './editabledescription/EditableDescription';
import { DuePicker } from './duepicker/DuePicker';
import { Dropdown } from './dropdown/Dropdown';
import { ErrorPage } from '../errorpage/ErrorPage';
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
    
    for (let i = 0; i < this.state.statusOptions.length; i++) {
      if (this.state.statusOptions[i].title === e.target.value) {
        newTodo.statusID = i;
      }
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

    // Empty title is not allowed
    if (todo.title !== '') {
      const response: ServiceResponse<Todo> = await updateTodo(todo);

      if (response.error) {
        this.setState({ error: response.error });
      }
      else {
        // Redirect to HomeBoard
        this.props.history.push('/');
      }
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
      return <ErrorPage errorMessage={this.state.error.message} />;
    }
    else if (this.state.isLoading) {
      // TODO: Dispaly some kind of spinner
      return (<div>Loading...</div>);
    }
    else {
      const { todo, statusOptions, initialStatus } = this.state;

      return (
        <div className="TodoItemEditor">
          <React.Fragment>
            <Link to="/">
              <span className="TodoItemEditor-close">&times;</span>
            </Link>
            <form onSubmit={this.handleSubmit}>
              <EditableTitle title={todo.title}
                            handleChange={this.handleTitleChange} />
              <EditableDescription description={todo.description}
                                  handleChange={this.handleDescriptionChange} />
              <div className="TodoItemEditor-container">
                <DuePicker due={todo.due}
                          handleChange={this.handleDateChange} />
                <Dropdown label="Status"
                          options={statusOptions.map(status => status.title)}
                          defaultOption={statusOptions[todo.statusID].title}
                          handleChange={this.handleStatusChange} />
                <Dropdown label="Priority"
                          options={range(1, statusOptions[todo.statusID].todosNumber, initialStatus !== todo.statusID)}
                          defaultOption={todo.priority.toString()}
                          handleChange={this.handlePriorityChange} />
                <button className="TodoItemEditor-delete" onClick={this.handleDeleteClick}>Delete Todo</button>
              </div>
              <div className="centered">
                <button type="submit" className="TodoItemEditor-save">Save</button>
              </div>
            </form>
          </React.Fragment>
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