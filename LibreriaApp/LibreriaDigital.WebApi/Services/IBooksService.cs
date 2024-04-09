using LibreriaDigital.WebApi.Dtos;
using LibreriaDigital.WebApi.Models;

namespace LibreriaDigital.WebApi.Services
{
    public interface IBooksService
    {
        public IEnumerable<BookDto> GetAll();
        public BookDto GetById(int id);
        public BookDto Add(BookDto book);
        public BookDto update(BookDto book);
        public void delete(int id);
        public IEnumerable<BookDto> GetAllByUserId(int id);
        public void RateAndReviewBook(RateAndReviewDto dto);
    }
}
