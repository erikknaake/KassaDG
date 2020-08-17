namespace Persistence.Repositories
{
    using Entities;

    public class ProductRepository : BaseRepository<Product>
    {
        private readonly KassaDgDbContext _kassaDgDbContext;

        public ProductRepository(KassaDgDbContext kassaDgDbContext) : base(kassaDgDbContext, kassaDgDbContext.Products)
        {
            _kassaDgDbContext = kassaDgDbContext;
        }
    }
}