namespace KassaDG.Controllers
{
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using Persistence.Entities;
    using Persistence.Repositories;

    public class ProductController : BaseController<Product>
    {
        public ProductController(IRepository<Product> repository) : base(repository)
        {
        }

        [HttpPost]
        public StatusCodeResult Update(Product updated)
        {
            try
            {
                var productToUpdate = Repository.Get().Single(x => x.Id == updated.Id);
                Repository.DbContext.Entry(productToUpdate).CurrentValues.SetValues(updated);
                Repository.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return new StatusCodeResult(409);
            }

            return new OkResult();
        }

        [HttpPost("updateStock")]
        public IActionResult UpdateStock(UpdateStockCommand updateStockCommand)
        {
            foreach (var updateStockCommandLine in updateStockCommand.StockToUpdate)
            {
                Repository
                        .Get()
                        .Single(x => x.Id == updateStockCommandLine.ProductId)
                        .AmountInStock = updateStockCommandLine.NewAmount;
            }
            Repository.SaveChanges();
            return Ok();
        }
    }
}