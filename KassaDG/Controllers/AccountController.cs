using KassaDG.Models;

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
        public IActionResult Enable(int id)
        {
            var account = FindAccountById(id);
            account.IsActive = true;
            Repository.SaveChanges();
            return Ok();
        }
        
        [HttpPost("{id:int}/disable")]
        public IActionResult Disable(int id)
        {
            var account = FindAccountById(id);
            account.IsActive = false;
            Repository.SaveChanges();
            return Ok();
        }
        
        [HttpPatch("{id:int}/name")]
        public IActionResult ChangeName([FromRoute] int id, [FromBody] UpdateAccountNameModel update)
        {
            var account = FindAccountById(id);
            account.AccountName = update.Name;
            Repository.SaveChanges();
            return Ok();
        }

        private Account FindAccountById(int id)
        {
            return Repository.Get().Single(x => x.Id == id);
        }
    }
}