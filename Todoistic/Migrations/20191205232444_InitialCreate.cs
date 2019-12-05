using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Todoistic.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Status",
                columns: table => new
                {
                    StatusID = table.Column<int>(nullable: false),
                    Title = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Status", x => x.StatusID);
                });

            migrationBuilder.CreateTable(
                name: "TodoItems",
                columns: table => new
                {
                    TodoItemID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Due = table.Column<DateTime>(nullable: false),
                    StatusID = table.Column<int>(nullable: false),
                    Priority = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TodoItems", x => x.TodoItemID);
                    table.ForeignKey(
                        name: "FK_TodoItems_Status_StatusID",
                        column: x => x.StatusID,
                        principalTable: "Status",
                        principalColumn: "StatusID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Status",
                columns: new[] { "StatusID", "Title" },
                values: new object[] { 0, "Todo" });

            migrationBuilder.InsertData(
                table: "Status",
                columns: new[] { "StatusID", "Title" },
                values: new object[] { 1, "In progress" });

            migrationBuilder.InsertData(
                table: "Status",
                columns: new[] { "StatusID", "Title" },
                values: new object[] { 2, "Done" });

            migrationBuilder.InsertData(
                table: "Status",
                columns: new[] { "StatusID", "Title" },
                values: new object[] { 3, "Postponed" });

            migrationBuilder.CreateIndex(
                name: "IX_TodoItems_StatusID",
                table: "TodoItems",
                column: "StatusID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TodoItems");

            migrationBuilder.DropTable(
                name: "Status");
        }
    }
}
