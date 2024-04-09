using LibreriaDigital.WebApi.Dtos;
using LibreriaDigital.WebApi.Models;

namespace LibreriaDigital.WebApi.Services
{
    public interface IUsersService
    {
        public IEnumerable<User> GetAll();
        public User GetById(int id);
        public User Add(User user);
        public User update(User user);
        public void delete(int id);
    }
}
