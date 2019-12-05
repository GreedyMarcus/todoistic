using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Todoistic.Models;
using Todoistic.Services.TodoService;

namespace Todoistic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class TodosController : ControllerBase
    {
        private ITodoRepository todoRepository;

        public TodosController(ITodoRepository todoRepository)
        {
            this.todoRepository = todoRepository;
        }

        // GET api/Todos
        [HttpGet]
        public async Task<ActionResult<List<TodoItemDTO>>> GetTodoItems()
        {
            return await todoRepository.GetTodoItems();
        }

        // GET api/Todos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItemDTO>> GetTodoItem(int id)
        {
            var todoItem = await todoRepository.GetTodoItem(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // POST api/Todos
        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateTodoItem(TodoItem item)
        {
            item = await todoRepository.CreateTodoItem(item);

            return CreatedAtAction(nameof(GetTodoItem), new { id = item.TodoItemID }, item);
        }

        // PUT api/Todos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodoItem(int id, TodoItem item)
        {
            if (id != item.TodoItemID)
            {
                return BadRequest();
            }

            await todoRepository.UpdateTodoItem(id, item);
            return Ok(item);
        }

        // DELETE api/Todos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            int result = await todoRepository.DeleteTodoItem(id);

            if (result == 0)
            {
                return NotFound();
            }
            
            return Ok();
        }
    }
}