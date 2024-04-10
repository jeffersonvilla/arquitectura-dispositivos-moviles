using LibreriaDigital.WebApi.Exceptions;
using LibreriaDigital.WebApi.Models;
using LibreriaDigital.WebApi.Repository;

namespace LibreriaDigital.WebApi.Services
{
    public class UsersService : IUsersService
    {
        private IRepository<User> _usersRepository;

        public UsersService(IRepository<User> usersRepository)
        {
            _usersRepository = usersRepository;
        }

        public User Add(User user)
        {
            User userFound = _usersRepository.GetByColumn(u=>u.Email == user.Email);
            if (userFound != null) 
            {
                throw new InvalidEmailException("Email " + user.Email + " is already used");
            }
            _usersRepository.Add(user);
            return user;
        }

        public void delete(int id)
        {
            User user = _usersRepository.GetById(id);
            if (user == null) {
                throw new UserNotFoundException("User with id " + id + " not found");
            }
            _usersRepository.Delete(id);
        }

        public IEnumerable<User> GetAll()
        {
            return _usersRepository.GetAll();
        }

        public User GetById(int id)
        {
            User user = _usersRepository.GetById(id);
            if(user == null) 
            {
                throw new UserNotFoundException("User with id " + id + " not found");
            }
            return user;
        }

        public User update(User user)
        {
            User userSaved = _usersRepository.GetById(user.Id);
            if (userSaved.Email != user.Email) 
            {
                throw new UserPutRequestInvalidEmailException("You can't change the email");
            }
            userSaved.Name = user.Name;
            userSaved.Lastname = user.Lastname;
            userSaved.Password = user.Password;
            _usersRepository.Update(userSaved);
            return userSaved;
        }
    }
}
