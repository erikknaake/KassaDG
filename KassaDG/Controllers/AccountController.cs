namespace KassaDG.Controllers
{
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Persistence.Entities;
    using Persistence.Repositories;

    public class AccountController : BaseController<Account>
    {
        public AccountController(AccountRepository repository) : base(repository)
        {
        }

        [HttpPost("{id}/enable")]
        public void Enable(int id)
        {
            var account = FindAccountById(id);
            account.IsActive = true;
            Repository.SaveChanges();
        }
        
        [HttpPost("{id}/disable")]
        public void Disable(int id)
        {
            var account = FindAccountById(id);
            account.IsActive = false;
            Repository.SaveChanges();
        }

        private Account FindAccountById(int id)
        {
            return Repository.Get().Single(x => x.Id == id);
        }
    }
}