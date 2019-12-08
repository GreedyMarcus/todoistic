using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todoistic.Models;
using Todoistic.Services.TodoService;

namespace Todoistic.Test.FakeServices
{
    class TodoRepositoryFake : ITodoRepository
    {
        public int lastGeneratedId;
        private readonly List<TodoItem> todoItems;

        public TodoRepositoryFake()
        {
            // Data for testing
            todoItems = new List<TodoItem>()
            {
                new TodoItem() {
                    TodoItemID = 1,
                    Title = "Finish assignment",
                    Description = "Write an essay about Napoleon.",
                    Due = new DateTime(2019, 12, 20),
                    StatusID = 0,
                    Priority = 1
                },
                new TodoItem() {
                    TodoItemID = 2,
                    Title = "Do shopping",
                    Description = "Buy milk, bread, cereal, butter and some vegies.",
                    Due = new DateTime(2019, 12, 21),
                    StatusID = 0,
                    Priority = 2
                },
                new TodoItem() {
                    TodoItemID = 3,
                    Title = "Buy new laptop",
                    Description = "Buy the Lenovo ideapad 530s.",
                    Due = new DateTime(2019, 12, 22),
                    StatusID = 0,
                    Priority = 3
                }
            };
            lastGeneratedId = todoItems.Count;
        }

        public async Task<List<TodoItemDTO>> GetTodoItems()
        {
            return await todoItems.Select(t => new TodoItemDTO
            {
                TodoItemID = t.TodoItemID,
                Title = t.Title,
                Description = t.Description,
                Due = t.Due,
                StatusID = t.StatusID,
                Priority = t.Priority
            }).ToAsyncEnumerable().ToList();
        }

        public async Task<TodoItemDTO> GetTodoItem(int id)
        {
            var todoItem = todoItems.Where(t => t.TodoItemID == id).FirstOrDefault();

            if (todoItem == null)
            {
                return null;
            }

            var todoItemDTO = new TodoItemDTO
            {
                TodoItemID = todoItem.TodoItemID,
                Title = todoItem.Title,
                Description = todoItem.Description,
                Due = todoItem.Due,
                StatusID = todoItem.StatusID,
                Priority = todoItem.Priority
            };

            return await Task.FromResult(todoItemDTO);
        }

        public async Task<TodoItem> CreateTodoItem(TodoItem item)
        {
            item.TodoItemID = lastGeneratedId + 1;
            todoItems.Add(item);

            return await Task.FromResult(item);
        }

        public async Task UpdateTodoItem(int id, TodoItem item)
        {
            var itemWithPrevState = todoItems.Where(t => t.TodoItemID == id).FirstOrDefault();

            if (item.StatusID != itemWithPrevState.StatusID)
            {
                var todosUnderPrevStatus = todoItems.Where(t => t.StatusID == itemWithPrevState.StatusID &&
                                                                t.Priority > itemWithPrevState.Priority);
                foreach (var todo in todosUnderPrevStatus)
                {
                    todo.Priority -= 1;
                }

                var todosUnderNewStatus = todoItems.Where(t => t.StatusID == item.StatusID &&
                                                               t.Priority >= item.Priority);
                foreach (var todo in todosUnderNewStatus)
                {
                    todo.Priority += 1;
                }
            }
            else
            {
                if (itemWithPrevState.Priority < item.Priority)
                {
                    var todosUnder = todoItems.Where(t => t.Priority > itemWithPrevState.Priority &&
                                                          t.Priority <= item.Priority);
                    foreach (var todo in todosUnder)
                    {
                        todo.Priority -= 1;
                    }
                }
                else
                {
                    var todosAbove = todoItems.Where(t => t.Priority < itemWithPrevState.Priority &&
                                                          t.Priority >= item.Priority);
                    foreach (var todo in todosAbove)
                    {
                        todo.Priority += 1;
                    }
                }
            }

            itemWithPrevState.StatusID = item.StatusID;
            itemWithPrevState.Priority = item.Priority;

            return;
        }

        public async Task<int> DeleteTodoItem(int id)
        {
            var todoItem = todoItems.Where(t => t.TodoItemID == id).FirstOrDefault();

            if (todoItem == null)
            {
                return 0;
            }

            var todosWithSameStatus = todoItems.Where(t => t.StatusID == todoItem.StatusID &&
                                                           t.Priority > todoItem.Priority);
            foreach (var todo in todosWithSameStatus)
            {
                todo.Priority -= 1;
            }

            todoItems.Remove(todoItem);
            return 1;
        }
    }
}