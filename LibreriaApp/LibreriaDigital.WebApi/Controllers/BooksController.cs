using LibreriaDigital.WebApi.Dtos;
using LibreriaDigital.WebApi.Exceptions;
using LibreriaDigital.WebApi.Models;
using LibreriaDigital.WebApi.Repository;
using LibreriaDigital.WebApi.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
            catch(Exception ex) 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
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
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
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
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // PUT api/<BooksController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] BookDto book)
        {
            /*if (id != book.Id) {
                return BadRequest();   
            }
            _bookRepository.Update(book);
            */return Ok();
        }

        // DELETE api/<BooksController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            //_bookRepository.Delete(id);
            return Ok();
        }
    }
}
