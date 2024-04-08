namespace LibreriaDigital.WebApi.Exceptions
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException() { }
        
        public UserNotFoundException(string message) : base(message) { }

        public UserNotFoundException(string mesage, Exception inner) : base(mesage, inner) { }
    }
}
