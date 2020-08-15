namespace Persistence.Repositories
{
    using Entities;

    public class ProductRepository : BaseRepository<Product>
    {
        public ProductRepository(KassaDgDbContext kassaDgDbContext) : base(kassaDgDbContext, kassaDgDbContext.Products)
        {
        }
    }
}