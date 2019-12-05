using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todoistic.Data;

namespace Todoistic.Services.StatusService
{
    public class StatusRepository : IStatusRepository
    {
        private readonly TodoisticDbContext context;

        public StatusRepository(TodoisticDbContext context)
        {
            this.context = context;
        }

        public async Task<List<StatusDTO>> GetStatus()
        {
            return await context.Status.Select(s => new StatusDTO
            {
                StatusID = s.StatusID,
                Title = s.Title,
                TodosNumber = s.TodoItems.Count()
            }).ToListAsync();
        }
    }
}