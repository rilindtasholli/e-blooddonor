using aspnet_core_api.Models;

namespace aspnet_core_api.Repositories
{
    public interface IDashboardRepository
    {
        Task<IEnumerable<Object>> GetAllDonations();
        Task<IEnumerable<Object>> GetDonationsByMonth(int month);
        Task<IEnumerable<Object>> GetDonationsByLocation(string location);

        Task<IEnumerable<Object>> GetAllUsers();
        Task<IEnumerable<Object>> GetUsersByLocation(string location);
        Task<IEnumerable<Object>> GetTopUsers();
    }
}
