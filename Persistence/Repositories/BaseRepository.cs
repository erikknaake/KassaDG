namespace Persistence.Repositories
{
    using System.Collections.Generic;
    using System.Linq;
    using Entities;
    using Microsoft.EntityFrameworkCore;

    public class BaseRepository<T> : IRepository<T> where T : class, IBaseEntity
    {
        private readonly DbSet<T> _dbSet;

        public BaseRepository(KassaDgDbContext dbContext, DbSet<T> dbSet)
        {
            DbContext = dbContext;
            _dbSet = dbSet;
        }

        public virtual IQueryable<T> Get()
        {
            return _dbSet.AsQueryable();
        }

        public virtual void Delete(int id)
        {
            var entity = _dbSet.Find(id);
            _dbSet.Remove(entity);
        }

        public virtual void Add(T entity)
        {
            _dbSet.Add(entity);
        }

        public virtual void AddRange(IEnumerable<T> entities)
        {
            _dbSet.AddRange(entities);
        }

        public void SaveChanges()
        {
            DbContext.SaveChanges();
            DbContext.Backup();
        }

        public KassaDgDbContext DbContext { get; }
    }
}