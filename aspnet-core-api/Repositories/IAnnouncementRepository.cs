using aspnet_core_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace aspnet_core_api.Repositories
{
    public interface IAnnouncementRepository
    {
        Task<ActionResult<Object>> GetAll(int page);
        Task<Announcement> Get(Guid id);
        Task<Announcement> Create(Announcement announcement);
        Task<Announcement> Update(Announcement announcement);
        Task Delete(Guid id);
    }
}
