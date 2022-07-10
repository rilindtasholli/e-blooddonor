using aspnet_core_api.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnet_core_api.Repositories
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly ApplicationDbContext _context;

        public AppointmentRepository(ApplicationDbContext context)
        {
            this._context = context;
        }
        public async Task<Appointment> Create(Appointment appoint)
        {
           _context.Appointments.Add(appoint);  
            await _context.SaveChangesAsync();
            return appoint;
        }

        public async Task Delete(Guid id)
        {
            var appointToDelete = await _context.Appointments.FindAsync(id);
            _context.Appointments.Remove(appointToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Object>> GetAll()
        {
            return await _context.Appointments
                .Select(a => new {
                    Id = a.Id,
                    Announcement = a.Announcement.Title,
                    Date = a.Date,
                    ApproveDate = a.ApproveDate,
                    Status = a.Status,
                    User = a.User.FullName
                }).ToListAsync();
        }

        public Task<Appointment> Get(Guid id)
        {
            return _context.Appointments.Where(a => a.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Appointment> Update(Appointment appoint)
        {
            _context.Entry(appoint).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return appoint;
        }


        public async Task<IEnumerable<Object>> GetUserAppointments(string id)
        {
            var result = await _context.Appointments.Where(a => a.Status == "Pending" && a.UserId == id)
                .Select(a => new
                {
                    Id = a.Id,
                    Date = a.Date,
                    Location = a.Location,
                    Announcement = a.Announcement
                }).ToListAsync();
            return result;
        }

        public async Task<IEnumerable<Object>> GetUserDonations(string id)
        {
            var result = await _context.Appointments.Where(a => a.Status == "Approved" && a.UserId == id)
                .Select(a => new
                {
                    Id = a.Id,
                    Date = a.Date,
                    Location = a.Location,
                    Announcement = a.Announcement
                }).ToListAsync();
            return result;
        }
    }
}
