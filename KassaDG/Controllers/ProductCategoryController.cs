using Persistence.Entities;
using Persistence.Repositories;

namespace KassaDG.Controllers
{
    public class ProductCategoryController : BaseController<ProductCategory>
    {
        private readonly IRepository<ProductCategory> _repository;

        public ProductCategoryController(IRepository<ProductCategory> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}