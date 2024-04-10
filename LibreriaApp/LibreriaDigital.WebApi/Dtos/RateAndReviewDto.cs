namespace LibreriaDigital.WebApi.Dtos
{
    public class RateAndReviewDto
    {
        public RateAndReviewDto() 
        {
            review = "";
            rating = -1;
        }
        public int bookId {  get; set; }
        public int userId {  get; set; }
        public int rating {  get; set; }
        public string review { get; set; }
    }
}
