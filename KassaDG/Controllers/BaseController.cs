namespace KassaDG.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Persistence.Repositories;

    [ApiController]
    [Route("[controller]")]
    public abstract class BaseController<T>: ControllerBase
    {
        private readonly IRepository<T> _repository;

        protected BaseController(IRepository<T> repository)
        {
            _repository = repository;
        }
        
        [HttpGet]
        public IEnumerable<T> Get()
        {
            return _repository.Get().ToList();
        }

        [HttpPut]
        public void Add(T entity)
        {
            _repository.Add(entity);
            _repository.SaveChanges();
        }

        [HttpDelete]
        public void Delete(T entity)
        {
            _repository.Delete(entity);
            _repository.SaveChanges();
        }
    }
}