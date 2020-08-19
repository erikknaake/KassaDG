namespace KassaDG.Controllers.Models
{
    using System.Collections.Generic;
    using Persistence.Entities;

    public class OrderHistoryResponse
    {
        public IEnumerable<Order> Orders { get; set; }
        public int TotalItems { get; set; }
    }
}