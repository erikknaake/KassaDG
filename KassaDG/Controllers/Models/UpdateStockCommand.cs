namespace KassaDG.Controllers.Models
{
    using System.Collections.Generic;

    public class UpdateStockCommand
    {
        public IEnumerable<UpdateStockCommandLine> StockToUpdate { get; set; }
    }

    public class UpdateStockCommandLine
    {
        public int ProductId { get; set; }
        public int NewAmount { get; set; }
    }
}