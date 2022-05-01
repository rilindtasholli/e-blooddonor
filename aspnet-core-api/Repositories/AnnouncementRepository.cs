using aspnet_core_api.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnet_core_api.Repositories
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly ApplicationDbContext _context;

        public AnnouncementRepository(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<IEnumerable<Announcement>> Get()
        {
            return await _context.Announcements.ToListAsync();
        }

        public async Task<Announcement> Get(Guid id)
        {
            return _context.Announcements.Where(u => u.Id == id).FirstOrDefault();
        }

        public async Task<Announcement> Create(Announcement announcement)
        {
            _context.Announcements.Add(announcement);
            await _context.SaveChangesAsync();

            return announcement;
        }

        public async Task<Announcement> Update(Announcement announcement)
        {
            _context.Entry(announcement).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return announcement;
        }

        public async Task Delete(Guid id)
        {
            var userToDelete = await _context.Announcements.FindAsync(id);
            _context.Announcements.Remove(userToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
