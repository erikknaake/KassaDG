namespace KassaDG.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Persistence.Entities;
    using Persistence.Repositories;

    public class AccountController : BaseController<Account>
    {
        public AccountController(AccountRepository repository) : base(repository)
        {
        }
    }
}