using LibreriaDigital.WebApi.Dtos;
using LibreriaDigital.WebApi.Exceptions;
using LibreriaDigital.WebApi.Models;
using LibreriaDigital.WebApi.Repository;
using LibreriaDigital.WebApi.Services;
using Microsoft.AspNetCore.Mvc;


namespace LibreriaDigital.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {

        private IBooksService _service;

        public BooksController(IBooksService service)
        {
            _service = service;
        }


        // GET: api/<BooksController>
        [HttpGet]
        public ActionResult<IEnumerable<BookDto>> Get()
        {
            try
            {
                return Ok(_service.GetAll());
            }
            catch(Exception) 
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
           
        }

        // GET api/<BooksController>/5
        [HttpGet("{id}")]
        public ActionResult<BookDto> Get(int id)
        {
            try
            {
                return Ok(_service.GetById(id));
            }
            catch(BookNotFoundException bnf)
            {
                return NotFound(bnf.Message);
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // POST api/<BooksController>
        [HttpPost]
        public ActionResult Post([FromBody] BookDto book)
        {
            try
            {
                _service.Add(book);
                return CreatedAtAction(nameof(Get), book);
            }
            catch (UserNotFoundException unf)
            {
                return BadRequest(unf.Message);
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // PUT api/<BooksController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] BookDto bookDto)
        {
            bookDto.Id = id;
            try
            {
                return Ok(_service.update(bookDto));
            }
            catch(BookNotFoundException bnf)
            {
                return NotFound(bnf.Message);
            }
            catch(BookPutRequestInvalidUserException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // DELETE api/<BooksController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _service.delete(id);
                return Ok("Book with id " + id + " deleted successfully");
            }
            catch (BookNotFoundException bnf)
            {
                return NotFound(bnf.Message);
            }
            catch (Exception) 
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("user/{id}")]
        public ActionResult<IEnumerable<BookDto>> GetAllUserCollection(int id) 
        {
            try
            {
                return Ok(_service.GetAllByUserId(id));
            }
            catch (UserNotFoundException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("rate/review/")]
        public ActionResult RateBook([FromBody] RateAndReviewDto dto)
        {
            try
            {
                _service.RateAndReviewBook(dto);
                return Ok("Book with id " + dto.bookId + " rated and reviewed successfully");
            }
            catch (InvalidRateException e) 
            {
                return BadRequest(e.Message);
            }
            catch (BookNotFoundException bnf)
            {
                return NotFound(bnf.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
