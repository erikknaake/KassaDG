namespace Persistence.Repositories
{
    using System.Linq;
    using Entities;

    public class AccountRepository : BaseRepository<Account>
    {
        public AccountRepository(KassaDgDbContext dbContext) : base(dbContext, dbContext.Accounts)
        {
        }

        public Account Get(int accountId)
        {
            return Get().SingleOrDefault(x => x.Id == accountId);
        }
    }
}