using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todoistic.Data;
using Todoistic.Models;

namespace Todoistic.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class TodosController : ControllerBase
    {
        private readonly TodoisticDbContext context;

        public TodosController(TodoisticDbContext context)
        {
            this.context = context;
        }

        // GET api/Todos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItemDTO>>> GetTodoItems()
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

        // GET api/Todos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItemDTO>> GetTodoItem(int id)
        {
            var todoItem = await context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
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

        // POST api/Todos
        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateTodoItem(TodoItem item)
        {
            context.TodoItems.Add(item);
            await context.SaveChangesAsync();

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

            // Detach local item otherwise application shits itself
            context.Entry(itemWithPrevState).State = EntityState.Detached;

            context.Entry(item).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return Ok(item);
        }

        // DELETE api/Todos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            // Get todo item to delete
            var todoItem = await context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
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
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}