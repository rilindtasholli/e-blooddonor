using aspnet_core_api.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnet_core_api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<IEnumerable<User>> Get()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> Get(string id)
        {
            return _context.Users.Where(u => u.Id == id).FirstOrDefault();
        }

        public async Task<User> Create(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User> Update(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task Delete(string id)
        {
            var userToDelete = await _context.Users.FindAsync(id);
            _context.Users.Remove(userToDelete);
            await _context.SaveChangesAsync();
        }


        public async Task<IEnumerable<Object>> GetAdmins()
        {
            var result = (from user in _context.Users
                          join userRole in _context.UserRoles on user.Id equals userRole.UserId
                          join role in _context.Roles on userRole.RoleId equals role.Id
                          where user.Id == userRole.UserId && (role.Name == "ADMIN" || role.Name == "SUPERADMIN")
                          select new
                          {
                              Id = user.Id,
                              Name = user.FullName,
                              Email = user.Email,
                              Location = user.Location,
                              Role = role.Name
                          });

            return result;
        }

    }
}
