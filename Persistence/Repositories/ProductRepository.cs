namespace Persistence.Repositories
{
    using Entities;
    using Microsoft.EntityFrameworkCore;

    public class ProductRepository : BaseRepository<Product>
    {
        private readonly KassaDgDbContext _kassaDgDbContext;

        public ProductRepository(KassaDgDbContext kassaDgDbContext) : base(kassaDgDbContext, kassaDgDbContext.Products)
        {
            _kassaDgDbContext = kassaDgDbContext;
        }

        public override void Add(Product entity)
        {
            _kassaDgDbContext.Products.Add(entity);
            _kassaDgDbContext.Entry(entity.ProductCategory).State = EntityState.Unchanged;
            _kassaDgDbContext.SaveChanges();
        }
    }
}