namespace KassaDG.Controllers.Models
{
    using System.Collections.Generic;

    public class OrderCommand
    {
        public int AccountId { get; set; }
        public IEnumerable<OrderCommandLine> OrderCommandLines { get; set; }
        public int? Deposit { get; set; }
    }

    public class OrderCommandLine
    {
        public int Id { get; set; }
        public int Amount { get; set; }
    }
}