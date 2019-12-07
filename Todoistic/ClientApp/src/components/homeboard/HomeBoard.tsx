import React, { Component } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Todo } from '../../models/todo';
import { Status } from '../../models/status';
import { TodoTable } from '../todotable/TodoTable';
import { ErrorPage } from '../errorpage/ErrorPage';
import { ServiceResponse, fetchTodos, postTodo, updateTodo } from '../../services/apiService';
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

  handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // No destination -> Wrong drop place
    if (!destination) {
      return;
    }

    // We dragged and dropped to the same place
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) {
      return;
    }

    // Todo with new status and priority
    const reorderedTodo: Todo = {
      todoItemID: parseInt(draggableId),
      title: "",
      description: "",
      due: new Date(),
      statusID: parseInt(destination.droppableId),
      priority: destination.index + 1
    }

    // Reorder todos in frontend
    const todos = reorderTodos([...this.state.todos], reorderedTodo);
    this.setState({ todos: todos });
    
    // Update todo in database
    let updatedTodo: Todo = {...reorderedTodo};
    todos.forEach(todo => {
      if (todo.todoItemID === reorderedTodo.todoItemID) {
        updatedTodo = {...todo};
      }
    });
    await updateTodo(updatedTodo);
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
          <DragDropContext onDragEnd={this.handleDragEnd}>
            <TodoTable title="Todo"
                      status={Status.Todo}
                      todos={todos
                        .sort(compareTodosPriority)
                        .filter(todo => todo.statusID === Status.Todo)
                      }
                      addTodo={this.addTodo} />
            <TodoTable title="In progress"
                      status={Status.InProgress}
                      todos={todos
                        .sort(compareTodosPriority)
                        .filter(todo => todo.statusID === Status.InProgress)
                      }
                      addTodo={this.addTodo} />
            <TodoTable title="Done"
                      status={Status.Done}
                      todos={todos
                        .sort(compareTodosPriority)
                        .filter(todo => todo.statusID === Status.Done)
                      }
                      addTodo={this.addTodo} />
            <TodoTable title="Postponed"
                      status={Status.Postponed}
                      todos={todos
                        .sort(compareTodosPriority)
                        .filter(todo => todo.statusID === Status.Postponed)
                      }
                      addTodo={this.addTodo} />
          </DragDropContext>
        </div>
      );
    }
  }
}

function compareTodosPriority(first: Todo, second: Todo) {
  if (first.priority < second.priority) {
    return -1;
  }
  if (first.priority > second.priority) {
    return 1;
  }
  return 0;
}

function reorderTodos(todos: Todo[], reorderedTodo: Todo): Todo[] {
  // Get previous state of reordered todo
  let todoWithPrevState: Todo = {...reorderedTodo};
  todos.forEach(todo => {
    if (todo.todoItemID === reorderedTodo.todoItemID) {
      todoWithPrevState = todo;
    }
  });

  // Check if status changed
  if (reorderedTodo.statusID !== todoWithPrevState.statusID) {
    todos.forEach(todo => {
      // Change priority of todos under previous status 
      if (todo.statusID === todoWithPrevState.statusID &&
          todo.priority > todoWithPrevState.priority)
      {
        todo.priority -= 1;
      }
      
      // Insert todo to new status table
      if (todo.statusID === reorderedTodo.statusID &&
        todo.priority >= reorderedTodo.priority)
      {
        todo.priority += 1;
      }
    });
  } 
  else {
    // Moving todos down
    if (todoWithPrevState.priority < reorderedTodo.priority) {
      todos.forEach(todo => {
        if (todo.priority > todoWithPrevState.priority &&
            todo.priority <= reorderedTodo.priority)
        {
          todo.priority -= 1;
        }
      });
    }
    // Moving todos up
    else {
      todos.forEach(todo => {
        if (todo.priority < todoWithPrevState.priority &&
            todo.priority >= reorderedTodo.priority)
        {
          todo.priority += 1;
        }
      });
    }
  }

  // Finally update the selected todo
  todoWithPrevState.statusID = reorderedTodo.statusID;
  todoWithPrevState.priority = reorderedTodo.priority;

  return todos;
}

export default HomeBoard;