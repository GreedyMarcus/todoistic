using System.Collections.Generic;
using System.Threading.Tasks;
using Todoistic.Models;

namespace Todoistic.Services.TodoService
{
    public interface ITodoRepository
    {
        Task<List<TodoItemDTO>> GetTodoItems();
        Task<TodoItemDTO> GetTodoItem(int id);
        Task<TodoItem> CreateTodoItem(TodoItem item);
        Task UpdateTodoItem(int id, TodoItem item);
        Task<int> DeleteTodoItem(int id);
    }
}