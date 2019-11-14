using System;

namespace Todoistic.Models
{
    public enum Status
    {
        Todo = 0,
        InProgress = 1,
        Done = 2,
        Postponed = 3
    }

    public class TodoItem
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Due { get; set; }
        public Status Status { get; set; }
        public int Priority { get; set; }
        public int PriorityMax { get; set; }
    }
}
