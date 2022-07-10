using aspnet_core_api.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnet_core_api.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly ApplicationDbContext _context;
        public MessageRepository(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<Message> Create(Message message)
        {
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return message;
        }

        public async Task Delete(Guid id)
        {
            var messageToDelete = await _context.Messages.FindAsync(id);
            _context.Messages.Remove(messageToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Message>> Get()
        {
            return await _context.Messages.ToListAsync();
        }

        public async Task<Message> Get(Guid id)
        {
            return _context.Messages.Where(m => m.Id == id).FirstOrDefault();
        }

        public async Task<Message> Update(Message message)
        {
            _context.Entry(message).State = EntityState.Modified; 
            await _context.SaveChangesAsync();

            return message;
        }

       
    }
}
