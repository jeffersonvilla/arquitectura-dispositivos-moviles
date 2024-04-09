using LibreriaDigital.WebApi.Dtos;
using LibreriaDigital.WebApi.Exceptions;
using LibreriaDigital.WebApi.Models;
using LibreriaDigital.WebApi.Repository;

namespace LibreriaDigital.WebApi.Services
{
    public class BooksService : IBooksService
    {

        private IRepository<Book> _bookRepository;
        private IRepository<User> _userRepository;

        public BooksService(IRepository<Book> bookRepository, IRepository<User> userRepository)
        {
            _bookRepository = bookRepository;
            _userRepository = userRepository;
        }

        public BookDto Add(BookDto bookdto)
        {
            User user = _userRepository.GetById(bookdto.UserId);
            if(user == null)
            {
                throw new UserNotFoundException("User with id " + bookdto.UserId + " not found");
            }
            Book book = mapBookFromDTO(bookdto);
            book.User = user;

            _bookRepository.Add(book);

            bookdto.Id = book.Id;
            return bookdto;
        }

        public void delete(int id)
        {
            Book book = _bookRepository.GetById(id);
            if(book == null)
            {
                throw new BookNotFoundException("Book with id " + id + " not found");
            }
            _bookRepository.Delete(id);
        }

        public IEnumerable<BookDto> GetAll()
        {
            List<BookDto> response = new List<BookDto>();
            foreach (Book book in _bookRepository.GetAll()) 
            {
                response.Add(mapToBookDTO(book));
            }
            return response;
        }

        public IEnumerable<BookDto> GetAllByUserId(int id)
        {
            User user = _userRepository.GetById(id);
            if(user == null)
            {
                throw new UserNotFoundException("User with id " + id + " not found");
            }

            List<BookDto> response = new List<BookDto>();
            foreach (Book book in _bookRepository.GetAllByColumn(b => b.UserId == id))
            {
                response.Add(mapToBookDTO(book));
            }
            return response;
        }

        public BookDto GetById(int id)
        {
            var book = _bookRepository.GetById(id);
            if (book == null)
            {
                throw new BookNotFoundException("Book with id " + id + " not found");
            }
            return mapToBookDTO(book);
        }

        public BookDto update(BookDto bookDto)
        {
            Book book = _bookRepository.GetById(bookDto.Id);

            if(book == null)
            {
                throw new BookNotFoundException("Book with id " + bookDto.Id + " not found");
            }
            if(book.UserId != bookDto.UserId)
            {
                throw new BookPutRequestInvalidUserException("User with id " + bookDto.UserId + " doesn't have access to book with id " + bookDto.Id);
            }

            book.Title = bookDto.Title;
            book.Author = bookDto.Author;
            book.PublicationYear = bookDto.PublicationYear;

            _bookRepository.Update(book);
            return mapToBookDTO(book);
        }

        private Book mapBookFromDTO(BookDto bookdto) 
        {
            Book book = new Book();
            book.Title = bookdto.Title;
            book.Author = bookdto.Author;
            book.PublicationYear = bookdto.PublicationYear;
            book.UserId = bookdto.UserId;
            return book;
        }

        private BookDto mapToBookDTO(Book book) {
            BookDto bookDto = new BookDto();
            bookDto.Id = book.Id;
            bookDto.Title = book.Title;
            bookDto.Author = book.Author;
            bookDto.PublicationYear = book.PublicationYear;
            bookDto.UserId = book.UserId;
            return bookDto;
        }
    }
}
