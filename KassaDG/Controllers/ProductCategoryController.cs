namespace KassaDG.Controllers
{
    using Persistence.Entities;
    using Persistence.Repositories;

    public class ProductCategoryController : BaseController<ProductCategory>
    {
        public ProductCategoryController(IRepository<ProductCategory> repository) : base(repository)
        {
        }
    }
}