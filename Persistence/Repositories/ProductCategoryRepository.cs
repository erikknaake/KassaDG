namespace Persistence.Repositories
{
    using Entities;

    public class ProductCategoryRepository : BaseRepository<ProductCategory>
    {
        public ProductCategoryRepository(KassaDgDbContext kassaDgDbContext) : base(kassaDgDbContext, kassaDgDbContext.ProductCategories)
        {
        }
    }
}