namespace LibreriaDigital.WebApi.Exceptions
{
    public class UserPutRequestInvalidEmailException : Exception
    {
        public UserPutRequestInvalidEmailException() { }
        public UserPutRequestInvalidEmailException(string message) : base(message) { }
        public UserPutRequestInvalidEmailException(string message,  Exception innerException) : base(message, innerException) { }
    }
}
