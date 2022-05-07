using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace aspnet_core_api.Migrations
{
    public partial class AddedAnnouncement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AnnouncementId",
                table: "Appointments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Appointments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Announcements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Bloodtype = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Announcements", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_AnnouncementId",
                table: "Appointments",
                column: "AnnouncementId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_UserId",
                table: "Appointments",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Announcements_AnnouncementId",
                table: "Appointments",
                column: "AnnouncementId",
                principalTable: "Announcements",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Users_UserId",
                table: "Appointments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Announcements_AnnouncementId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Users_UserId",
                table: "Appointments");

            migrationBuilder.DropTable(
                name: "Announcements");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_AnnouncementId",
                table: "Appointments");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_UserId",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "AnnouncementId",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Appointments");
        }
    }
}
