using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Todoistic.Data;
using Todoistic.Services.StatusService;

namespace Todoistic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class StatusController : Controller
    {
        private IStatusRepository statusRepository;

        public StatusController(IStatusRepository statusRepository)
        {
            this.statusRepository = statusRepository;
        }

        // GET api/Todos
        [HttpGet]
        public async Task<ActionResult<List<StatusDTO>>> GetStatus()
        {
            return await statusRepository.GetStatus();
        }
    }
}