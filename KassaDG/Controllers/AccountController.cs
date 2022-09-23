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

        [HttpPost("{id:int}/enable")]
        public void Enable([FromUri] int id)
        {
            var account = FindAccountById(id);
            account.IsActive = true;
            Repository.SaveChanges();
        }
        
        [HttpPost("{id:int}/disable")]
        public void Disable([FromRoute] int id)
        {
            var account = FindAccountById(id);
            account.IsActive = false;
            Repository.SaveChanges();
        }

        [HttpPut("{id:int}/name")]
        public void ChangeName([FromRoute] int id, [FromBody] String name)
        {
            var account = FindAccountById(id);
            account.AccountName = name;
            Repository.SaveChanges();
        }

        private Account FindAccountById(int id)
        {
            return Repository.Get().Single(x => x.Id == id);
        }
    }
}