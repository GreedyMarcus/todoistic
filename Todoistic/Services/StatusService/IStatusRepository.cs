using System.Collections.Generic;
using System.Threading.Tasks;
using Todoistic.Data;

namespace Todoistic.Services.StatusService
{
    public interface IStatusRepository
    {
        Task<List<StatusDTO>> GetStatus();
    }
}