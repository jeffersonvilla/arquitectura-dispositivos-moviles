﻿namespace LibreriaDigital.WebApi.Dtos
{
    public class BookDto
    {
        public BookDto() 
        {
            Title = "";
            Author = "";
            review = "";

        }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int PublicationYear { get; set; }
        public int rating { get; set; }
        public string review { get; set; }
        public int UserId { get; set; }
    }
}
