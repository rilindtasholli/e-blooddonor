using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace aspnet_core_api.Migrations
{
    public partial class UserRolesUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3330a8c1-74e1-4aaf-bef8-63bf5ae9c22e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bd64c66e-7445-41ab-a385-a55fe9235082");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "071c186e-03d8-4b45-9c76-58f8d1011875", "f8db3607-5a74-416b-add9-d218d202432c", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "94e197a9-ed16-4d8b-98d4-5d67a7ffb4e6", "a2fcebfb-4bfa-4ea6-b205-07d8d7ed4864", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a115b550-4864-4888-8bf7-841a34200712", "cda1e7e0-97d4-47ab-a422-14145ac175c0", "SuperAdmin", "SUPERADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "071c186e-03d8-4b45-9c76-58f8d1011875");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "94e197a9-ed16-4d8b-98d4-5d67a7ffb4e6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a115b550-4864-4888-8bf7-841a34200712");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3330a8c1-74e1-4aaf-bef8-63bf5ae9c22e", "6c1ebaeb-9e79-4254-86d7-752350183339", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "bd64c66e-7445-41ab-a385-a55fe9235082", "837e68af-6bee-4bc1-9972-b97a5f527da3", "Admin", "ADMIN" });
        }
    }
}
