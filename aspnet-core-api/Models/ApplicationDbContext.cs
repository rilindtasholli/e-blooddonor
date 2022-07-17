
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace aspnet_core_api.Models
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        //public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //compute FullName property
            modelBuilder.Entity<User>()
                .Property(p => p.FullName)
                .HasComputedColumnSql("[FirstName] + ' ' + [LastName]");

            modelBuilder.Entity<Appointment>()
                .Property(a => a.Status)
                .HasDefaultValue("Pending");

            modelBuilder.Entity<IdentityRole>().HasData(
               new IdentityRole
               {
                   Name = "User",
                   NormalizedName = "USER"
               },
               new IdentityRole
               {
                   Name = "Admin",
                   NormalizedName = "ADMIN"
               },
               new IdentityRole
               {
                   Name = "SuperAdmin",
                   NormalizedName = "SUPERADMIN"
               }
               );
        }

    }


}
