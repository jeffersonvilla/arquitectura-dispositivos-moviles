namespace LibreriaDigital.WebApi.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int PublicationYear { get; set; }
        public int rating { get; set; }
        public string review { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
