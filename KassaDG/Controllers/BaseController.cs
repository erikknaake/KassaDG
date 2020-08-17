namespace KassaDG.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Persistence.Entities;
    using Persistence.Repositories;

    [ApiController]
    [Route("[controller]")]
    public abstract class BaseController<T>: ControllerBase where T : IBaseEntity
    {
        protected readonly IRepository<T> Repository;

        protected BaseController(IRepository<T> repository)
        {
            Repository = repository;
        }
        
        [HttpGet("{id}")]
        public T Get(int id)
        {
            return Repository.Get().Single(x => x.Id == id);
        }
        
        [HttpGet]
        public IEnumerable<T> Get()
        {
            return Repository.Get().ToList();
        }

        [HttpPut]
        public StatusCodeResult Add(T entity)
        {
            try
            {
                Repository.Add(entity);
                Repository.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return new StatusCodeResult(409);
            }
            return new OkResult();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Repository.Delete(id);
            Repository.SaveChanges();
        }
    }
}