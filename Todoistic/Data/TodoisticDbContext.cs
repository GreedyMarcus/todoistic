using Microsoft.EntityFrameworkCore;
using Todoistic.Models;

namespace Todoistic.Data
{
    public class TodoisticDbContext : DbContext
    {
        public TodoisticDbContext(DbContextOptions<TodoisticDbContext> options) : base(options) { }

        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Status> Status { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Data seeding
            modelBuilder.Entity<Status>().HasData(
                new Status { StatusID = 0, Title = "Todo" },
                new Status { StatusID = 1, Title = "In progress" },
                new Status { StatusID = 2, Title = "Done" },
                new Status { StatusID = 3, Title = "Postponed" }
            );
        }
    }
}