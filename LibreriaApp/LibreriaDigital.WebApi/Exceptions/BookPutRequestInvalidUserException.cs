namespace LibreriaDigital.WebApi.Exceptions
{
    public class BookPutRequestInvalidUserException : Exception
    {
        public BookPutRequestInvalidUserException() { }
        public BookPutRequestInvalidUserException(string message) : base(message) { }
        public BookPutRequestInvalidUserException(string message,  Exception innerException) : base(message, innerException) { }
    }
}
