using aspnet_core_api.Models;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<ActionResult<Object>> GetAll(int page)
        {
            var pageResults = 3f;
            var pageCount = Math.Ceiling(_context.Announcements.Count() / pageResults);

            var announcements = new Object();

            if (page <= 0)
            {
                announcements = await _context.Announcements.Include(a => a.Appointments)
                .ToListAsync();
            }
            else
            {
                announcements = await _context.Announcements.Include(a => a.Appointments)
                .Skip((page - 1) * (int)pageResults)
                .Take((int)pageResults)
                .ToListAsync();
            }


            var response = new
            {
                Announcements = announcements,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            return response;
        }

        public async Task<Announcement> Get(Guid id)
        {
            return _context.Announcements.Where(a => a.Id == id).FirstOrDefault();
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
