namespace Persistence.Repositories
{
    using System.Linq;
    using Entities;
    using Microsoft.EntityFrameworkCore;

    public class OrderRepository : BaseRepository<Order>
    {
        public OrderRepository(KassaDgDbContext dbContext) : base(dbContext, dbContext.Orders)
        {
        }

        public override IQueryable<Order> Get()
        {
            return base.Get().Include(x => x.OrderLines);
        }
    }
}