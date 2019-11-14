using Microsoft.EntityFrameworkCore;
using Todoistic.Models;

namespace Todoistic.Data
{
    public class TodoisticDbContext : DbContext
    {
        public TodoisticDbContext(DbContextOptions<TodoisticDbContext> options) : base(options) { }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
