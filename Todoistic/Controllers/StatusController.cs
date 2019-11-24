using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todoistic.Data;

namespace Todoistic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class StatusController : Controller
    {
        private readonly TodoisticDbContext context;

        public StatusController(TodoisticDbContext context)
        {
            this.context = context;
        }

        // GET api/Todos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatusDTO>>> GetStatus()
        {
            return await context.Status.Select(s => new StatusDTO{
                StatusID = s.StatusID,
                Title = s.Title,
                TodosNumber = s.TodoItems.Count()
            }).ToListAsync();
        }
    }
}
