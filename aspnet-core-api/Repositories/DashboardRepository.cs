using aspnet_core_api.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnet_core_api.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly ApplicationDbContext _context;

        public DashboardRepository(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<IEnumerable<Object>> GetAllDonations()
        {
            return await _context.Appointments.Where(a => a.Status == "Approved").ToListAsync();
        }

        public async Task<IEnumerable<Object>> GetDonationsByMonth(int month)
        {
            var today = DateTime.Now;

            var result = await _context.Appointments.Where(a =>
                    a.Status == "Approved" &&
                    a.ApproveDate.Value.Year == today.Year &&
                    a.ApproveDate.Value.Month == month
                ).ToListAsync();

            return result;
        }

        public async Task<IEnumerable<Object>> GetDonationsByLocation(string location)
        {
            var result = await _context.Appointments.Where(a =>
                    a.Status == "Approved" &&
                    a.Location == location
                ).ToListAsync();

            return result;
        }


        // ---------------------------------------

        public async Task<IEnumerable<Object>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<IEnumerable<Object>> GetUsersByLocation(string location)
        {
            var result = await _context.Users.Where(u =>
                    u.Location == location
                ).ToListAsync();

            return result;
        }

        public async Task<IEnumerable<Object>> GetTopUsers()
        {
            var donations = (from user in _context.Users
                             join appointment in _context.Appointments on user.Id equals appointment.UserId
                             where user.Id == appointment.UserId && appointment.Status == "Approved"
                             select new
                             {
                                 Id = user.Id,
                                 Name = user.FullName,
                                 Location = user.Location
                             });

            var result = (from user in donations
                          group user by new { user.Id, user.Name, user.Location } into g
                          orderby g.Count() descending
                          select new { User = g.Key, DonationsCount = g.Count() }
                           ).Take(5);

            return result;
        }

    }
}
