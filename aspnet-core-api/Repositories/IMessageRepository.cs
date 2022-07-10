using aspnet_core_api.Models;

namespace aspnet_core_api.Repositories
{
    public interface IMessageRepository
    {
        Task<IEnumerable<Message>> Get();
        Task<Message> Get(Guid id);
        Task<Message> Create(Message message);
        Task<Message> Update(Message message);
        Task Delete(Guid id);
    }
}
