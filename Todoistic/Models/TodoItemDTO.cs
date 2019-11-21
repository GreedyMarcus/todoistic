using System;

namespace Todoistic.Models
{
    public class TodoItemDTO
    {
        public int TodoItemID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Due { get; set; }
        public int StatusID { get; set; }
        public int Priority { get; set; }
    }
}