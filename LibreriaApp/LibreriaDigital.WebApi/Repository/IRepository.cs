namespace LibreriaDigital.WebApi.Repository
{
    public interface IRepository<T>
    {
        T GetById(int id);
        IEnumerable<T> GetAll();
        void Add(T entity);
        void Update(T entity);
        void Delete(int id);
        T GetByColumn(Func<T, bool> filter);
        IEnumerable<T> GetAllByColumn(Func<T, bool> filter);
    }
}
