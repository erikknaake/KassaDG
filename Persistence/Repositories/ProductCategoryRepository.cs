using System;

namespace Persistence.Repositories
{
    using System.Linq;
    using Entities;
    using Microsoft.EntityFrameworkCore;

    public class ProductCategoryRepository : BaseRepository<ProductCategory>
    {
        public ProductCategoryRepository(KassaDgDbContext kassaDgDbContext) : base(kassaDgDbContext,
            kassaDgDbContext.ProductCategories)
        {
        }

        public override IQueryable<ProductCategory> Get()
        {
            return base.Get().Include(x => x.Products);
        }
        
        public override void Delete(int categoryId)
        {
            var category = base.Get()
                .Include(x => x.Products)
                .Include(x => x.ChildrenCategories)
                .Single(x => x.Id == categoryId);
            if (category.Products.Any() || category.ChildrenCategories.Any())
            {
                throw new DependentEntitiesExistException();
            }

            DbContext.Remove(category);
            SaveChanges();
        }
    }
}