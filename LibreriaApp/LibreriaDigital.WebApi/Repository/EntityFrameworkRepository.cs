using Microsoft.EntityFrameworkCore;

namespace LibreriaDigital.WebApi.Repository
{
    public class EntityFrameworkRepository<T> : IRepository<T> where T : class
    {
        private readonly DbContext _context;
        private readonly DbSet<T> _dbSet;

        public EntityFrameworkRepository(DbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public T GetById(int id)
        {
            return _dbSet.Find(id);
        }

        public IEnumerable<T> GetAll()
        {
             return _dbSet.ToList();
        }

        public void Add(T entity)
        {
            _dbSet.Attach(entity);
            _context.SaveChanges();
        }

        public void Update(T entity)
        {
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _dbSet.Find(id);
            if(user != null)
            {
                _dbSet.Remove(user);
                _context.SaveChanges();
            }
        }
    }
}
