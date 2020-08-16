namespace KassaDG.Controllers
{
    using Persistence.Entities;
    using Persistence.Repositories;

    public class OrderController : BaseController<Order>
    {
        public OrderController(IRepository<Order> repository) : base(repository)
        {
        }
    }
}