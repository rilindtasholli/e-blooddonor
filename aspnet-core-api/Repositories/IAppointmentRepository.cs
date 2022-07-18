using aspnet_core_api.Models;

namespace aspnet_core_api.Repositories
{
    public interface IAppointmentRepository
    {
        Task<IEnumerable<Object>> GetAll();
        Task<Appointment> Get(Guid id);
        Task<Appointment> Create(Appointment appoint);
        Task<Appointment> Update(Appointment appoint);
        Task Delete(Guid id);

        Task<IEnumerable<Object>> GetUserAppointments(string id);
        Task<IEnumerable<Object>> GetUserDonations(string id);
    }
}
