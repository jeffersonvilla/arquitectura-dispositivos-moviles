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
            var entity = _dbSet.Find(id);
            if(entity != null)
            {
                _dbSet.Remove(entity);
                _context.SaveChanges();
            }
        }

        public T GetByColumn(Func<T, bool> filter)
        {
            return _dbSet.FirstOrDefault(filter, null);
        }

        public IEnumerable<T> GetAllByColumn(Func<T, bool> filter)
        {
            return _dbSet.Where(filter).ToList();
        }
    }
}
