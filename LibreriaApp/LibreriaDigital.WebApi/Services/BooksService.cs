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

        public BookDto Add(BookDto bookDto)
        {
            User user = _userRepository.GetById(bookDto.UserId);
            if(user == null)
            {
                throw new UserNotFoundException("User with id " + bookDto.UserId + " not found");
            }
            Book book = mapBookFromDTO(bookDto);
            book.User = user;

            _bookRepository.Add(book);

            bookDto.Id = book.Id;
            return bookDto;
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

        public void RateAndReviewBook(RateAndReviewDto dto)
        {
            Book book = _bookRepository.GetByColumn(b=>b.Id == dto.bookId && b.UserId == dto.userId);
            if (book == null) 
            {
                throw new BookNotFoundException("Book with id " + dto.bookId + " of user wiht id " + dto.userId + " not found");
            }

            if (dto.rating != -1 && (dto.rating < 1 || dto.rating > 5))
            {
                throw new InvalidRateException("Rating must be from 1 to 5");
            }

            if (dto.rating != -1)
            {            
                book.rating = dto.rating;
            }
            if (dto.review != "") 
            { 
                book.review = dto.review;
            }
            _bookRepository.Update(book);
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

            if (bookDto.Title != "")
            {                
                book.Title = bookDto.Title;
            }
            if (bookDto.Author != "")
            {
                book.Author = bookDto.Author;
            }
            if (bookDto.PublicationYear != 0)
            {
                book.PublicationYear = bookDto.PublicationYear;
            }
            if (bookDto.rating != 0)
            {
                book.rating = bookDto.rating;
            }
            if(bookDto.review != "")
            {
                book.review = bookDto.review;
            }

            _bookRepository.Update(book);
            return mapToBookDTO(book);
        }

        private Book mapBookFromDTO(BookDto bookDto) 
        {
            Book book = new Book();
            book.Title = bookDto.Title;
            book.Author = bookDto.Author;
            book.PublicationYear = bookDto.PublicationYear;
            book.UserId = bookDto.UserId;
            book.rating = bookDto.rating;
            book.review = bookDto.review;
            return book;
        }

        private BookDto mapToBookDTO(Book book) {
            BookDto bookDto = new BookDto();
            bookDto.Id = book.Id;
            bookDto.Title = book.Title;
            bookDto.Author = book.Author;
            bookDto.PublicationYear = book.PublicationYear;
            bookDto.UserId = book.UserId;
            bookDto.rating = book.rating;
            bookDto.review = book.review;
            return bookDto;
        }
    }
}
