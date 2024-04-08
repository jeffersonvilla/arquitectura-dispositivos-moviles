namespace LibreriaDigital.WebApi.Exceptions
{
    public class BookNotFoundException : Exception
    {
        public BookNotFoundException() { }
        public BookNotFoundException(string message) : base(message) { }
        public BookNotFoundException(string mesage, Exception inner) : base(mesage, inner) { }
    }
}
