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

        public async Task<IEnumerable<Appointment>> Get()
        {
            return await _context.Appointments.ToListAsync();   
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
    }
}
