using Microsoft.EntityFrameworkCore;

namespace LibreriaDigital.WebApi.Models
{
    public class LibreriaAppDbContext : DbContext
    {
        public LibreriaAppDbContext(DbContextOptions<LibreriaAppDbContext> options) : base(options) { }

        DbSet<User> Users { get; set; }
        DbSet<Book> Books { get; set; }
    }
}
