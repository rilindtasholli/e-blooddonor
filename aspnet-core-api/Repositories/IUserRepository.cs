using aspnet_core_api.Models;

namespace aspnet_core_api.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> Get();
        Task<User> Get(string id);
        Task<User> Create(User user);
        Task<User> Update(User user);
        Task Delete(string id);

        Task<IEnumerable<Object>> GetAdmins();
    }
}
