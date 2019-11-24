import { Todo } from '../models/todo';
import { StatusDTO } from '../models/statusDTO';

export interface ServiceResponse<T> {
  data: T;
  error?: Error;
}

async function fetchService(requestEnd: RequestInfo,
                            serviceResponse: ServiceResponse<any>,
                            options?: RequestInit): Promise<ServiceResponse<any>> {
  return new Promise(resolve => {
    const request = 'http://localhost:62093/api/' + requestEnd;
    
    fetch(request, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        if (response.ok) {
          // Avoid error caused by empty responses
          return response.text()
            .then(text => {
              return text ? JSON.parse(text) : {}
            });
        }
      })
      .then(result => {
        serviceResponse.data = result;
        resolve(serviceResponse);
      })
      .catch(error => {
        serviceResponse.error = error;
        resolve(serviceResponse);
      });
  });
}

export const fetchTodos = async (): Promise<ServiceResponse<Todo[]>> => {
  const request = 'Todos';
  const serviceResponse: ServiceResponse<Todo[]> = {
    data: []
  }

  return await fetchService(request, serviceResponse);
}

export const fetchSingleTodo = async (todoId: number): Promise<ServiceResponse<Todo>> => {
  const request = `Todos/${todoId}`;
  const serviceResponse: ServiceResponse<Todo> = {
    data: {
      todoItemID: 0,
      title: "",
      description: "",
      due: new Date(),
      statusID: 0,
      priority: 1
    }
  }

  return await fetchService(request, serviceResponse);
}

export const postTodo = async (todo: Todo): Promise<ServiceResponse<Todo>> => {
  const request = 'Todos';
  const serviceResponse: ServiceResponse<Todo> = {
    data: todo
  }

  const requestBody = {
    title: todo.title,
    description: todo.description,
    due: todo.due,
    statusID: todo.statusID,
    priority: todo.priority
  }

  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }

  return await fetchService(request, serviceResponse, options);
}

export const updateTodo = async (todo: Todo): Promise<ServiceResponse<Todo>> => {
  const request = `Todos/${todo.todoItemID}`;
  const serviceResponse: ServiceResponse<Todo> = {
    data: todo
  }

  const options: RequestInit = {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }

  return await fetchService(request, serviceResponse, options);
}

export const deleteTodo = async (todoId: number): Promise<ServiceResponse<{}>> => {
  const request = `Todos/${todoId}`;
  const serviceResponse: ServiceResponse<{}> = {
    data: {}
  }

  const options: RequestInit = {
    method: 'DELETE'
  }

  return await fetchService(request, serviceResponse, options);
}

export const fetchStatus = async (): Promise<ServiceResponse<StatusDTO[]>> => {
  const request = 'Status';
  const serviceResponse: ServiceResponse<StatusDTO[]> = {
    data: []
  }

  return await fetchService(request, serviceResponse);
}