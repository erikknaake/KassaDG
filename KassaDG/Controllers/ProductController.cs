namespace KassaDG.Controllers
{
    using Persistence.Entities;
    using Persistence.Repositories;

    public class ProductController : BaseController<Product>
    {
        public ProductController(IRepository<Product> repository) : base(repository)
        {
        }
    }
}