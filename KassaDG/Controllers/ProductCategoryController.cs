namespace KassaDG.Controllers
{
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Persistence.Entities;
    using Persistence.Repositories;

    public class ProductCategoryController : BaseController<ProductCategory>
    {
        private readonly IRepository<ProductCategory> _repository;

        public ProductCategoryController(IRepository<ProductCategory> repository) : base(repository)
        {
            _repository = repository;
        }

        [HttpGet("{id}")]
        public ProductCategory Get([FromRoute]int id)
        {
            return _repository.Get().Single(x => x.CategoryId == id);
        }
    }
}