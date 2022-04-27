
using Microsoft.EntityFrameworkCore;

namespace aspnet_core_api.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

    }


}
