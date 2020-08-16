namespace Persistence.Repositories
{
    using System.Linq;
    using Entities;
    using Microsoft.EntityFrameworkCore;

    public class ProductCategoryRepository : BaseRepository<ProductCategory>
    {
        public ProductCategoryRepository(KassaDgDbContext kassaDgDbContext) : base(kassaDgDbContext, kassaDgDbContext.ProductCategories)
        {
        }

        public override IQueryable<ProductCategory> Get()
        {
            return base.Get().Include(x => x.Products);
        }
    }
}