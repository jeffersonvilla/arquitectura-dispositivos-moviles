using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibreriaDigital.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class ratings_and_reviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "rating",
                table: "Books",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "review",
                table: "Books",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "rating",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "review",
                table: "Books");
        }
    }
}
