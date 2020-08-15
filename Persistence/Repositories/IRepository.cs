namespace Persistence.Repositories
{
    using System.Collections.Generic;
    using System.Linq;

    public interface IRepository<T>
    {
        IQueryable<T> Get();
        void Delete(T entity);
        void Add(T entity);
        void AddRange(IEnumerable<T> entities);
        void SaveChanges();
    }
}