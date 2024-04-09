namespace LibreriaDigital.WebApi.Exceptions
{
    public class InvalidRateException : Exception
    {
        public InvalidRateException() { }
        public InvalidRateException(string message) : base(message) { }
        public InvalidRateException(string message,  Exception innerException) : base(message, innerException) { }
    }
}
