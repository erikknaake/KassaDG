using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence.Entities;
using Persistence.Repositories;

namespace KassaDG.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public abstract class BaseController<T> : ControllerBase where T : IBaseEntity
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
            return ExecuteWithUniqueProtection(() =>
            {
                Repository.Add(entity);
                Repository.SaveChanges();
            });
        }

        protected StatusCodeResult ExecuteWithUniqueProtection(Action func)
        {
            try
            {
                func();
            }
            catch (DbUpdateException)
            {
#if DEBUG
                // TODO: get a proper logger
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"Exception occured. Returning 409: {e.Message}\n{e.InnerException?.Message}");
                Console.ResetColor();
#endif
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