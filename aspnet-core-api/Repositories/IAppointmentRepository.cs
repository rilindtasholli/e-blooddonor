﻿using aspnet_core_api.Models;

namespace aspnet_core_api.Repositories
{
    public interface IAppointmentRepository
    {
        Task<IEnumerable<Appointment>> Get();
        Task<Appointment> Get(Guid id);
        Task<Appointment> Create(Appointment appoint);
        Task<Appointment> Update(Appointment appoint);
        Task Delete(Guid id);
    }
}
