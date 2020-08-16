namespace KassaDG.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Persistence.Entities;
    using Persistence.Repositories;

    public class AccountController : BaseController<Account>
    {
        private readonly AccountRepository _repository;

        public AccountController(AccountRepository repository) : base(repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public void AddToBalance(int accountId, int amountCents)
        {
            var account = _repository.Get(accountId);
            account.BalanceCents += amountCents;
            _repository.SaveChanges();
        }
    }
}