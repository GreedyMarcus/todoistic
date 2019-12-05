using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todoistic.Data;
using Todoistic.Models;

namespace Todoistic.Services.TodoService
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoisticDbContext context;

        public TodoRepository(TodoisticDbContext context)
        {
            this.context = context;
        }

        public async Task<List<TodoItemDTO>> GetTodoItems()
        {
            return await context.TodoItems.Select(t => new TodoItemDTO {
                TodoItemID = t.TodoItemID,
                Title = t.Title,
                Description = t.Description,
                Due = t.Due,
                StatusID = t.StatusID,
                Priority = t.Priority
            }).ToListAsync();
        }

        public async Task<TodoItemDTO> GetTodoItem(int id)
        {
            var todoItem = await context.TodoItems.FindAsync(id);

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

            return todoItemDTO;
        }

        public async Task<TodoItem> CreateTodoItem(TodoItem item)
        {
            context.TodoItems.Add(item);
            await context.SaveChangesAsync();

            return item;
        }

        public async Task UpdateTodoItem(int id, TodoItem item)
        {
            // Get todo item with previous state
            var itemWithPrevState = await context.TodoItems.FindAsync(id);

            // Check if status changed
            if (item.StatusID != itemWithPrevState.StatusID)
            {
                // Change priority of todos under previous status
                var todosUnderPrevStatus = await context.TodoItems
                                                            .Where(t => t.StatusID == itemWithPrevState.StatusID &&
                                                                        t.Priority > itemWithPrevState.Priority)
                                                            .ToListAsync();
                foreach (var todo in todosUnderPrevStatus)
                {
                    todo.Priority -= 1;

                    context.Entry(todo).State = EntityState.Modified;
                    await context.SaveChangesAsync();
                }

                // Insert todo item to new place
                var todosUnderNewStatus = await context.TodoItems
                                                            .Where(t => t.StatusID == item.StatusID &&
                                                                        t.Priority >= item.Priority)
                                                            .ToListAsync();
                foreach (var todo in todosUnderNewStatus)
                {
                    todo.Priority += 1;

                    context.Entry(todo).State = EntityState.Modified;
                    await context.SaveChangesAsync();
                }
            }
            else
            {
                // Moving todo item down
                if (itemWithPrevState.Priority < item.Priority)
                {
                    var todosUnder = await context.TodoItems
                                                        .Where(t => t.Priority > itemWithPrevState.Priority &&
                                                                    t.Priority <= item.Priority)
                                                        .ToListAsync();
                    foreach (var todo in todosUnder)
                    {
                        todo.Priority -= 1;

                        context.Entry(todo).State = EntityState.Modified;
                        await context.SaveChangesAsync();
                    }
                }
                // Moving todo item up
                else
                {
                    var todosAbove = await context.TodoItems
                                                        .Where(t => t.Priority < itemWithPrevState.Priority &&
                                                                    t.Priority >= item.Priority)
                                                        .ToListAsync();
                    foreach (var todo in todosAbove)
                    {
                        todo.Priority += 1;

                        context.Entry(todo).State = EntityState.Modified;
                        await context.SaveChangesAsync();
                    }
                }
            }

            // Must detach local item to update successfully
            context.Entry(itemWithPrevState).State = EntityState.Detached;

            context.Entry(item).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return;
        }

        public async Task<int> DeleteTodoItem(int id)
        {
            // Get todo item to delete
            var todoItem = await context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return 0;
            }

            // Get todos with same status as item
            var todosWithSameStatus = await context.TodoItems
                                                    .Where(t => t.StatusID == todoItem.StatusID &&
                                                                t.Priority > todoItem.Priority)
                                                    .ToListAsync();
            foreach (var todo in todosWithSameStatus)
            {
                todo.Priority -= 1;

                context.Entry(todo).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }

            context.TodoItems.Remove(todoItem);
            return await context.SaveChangesAsync();
        }
    }
}