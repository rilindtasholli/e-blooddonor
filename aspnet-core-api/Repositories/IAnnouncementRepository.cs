using aspnet_core_api.Models;
namespace aspnet_core_api.Repositories
{
    public interface IAnnouncementRepository
    {
        Task<IEnumerable<Announcement>> Get();
        Task<Announcement> Get(Guid id);
        Task<Announcement> Create(Announcement announcement);
        Task<Announcement> Update(Announcement announcement);
        Task Delete(Guid id);
    }
}
