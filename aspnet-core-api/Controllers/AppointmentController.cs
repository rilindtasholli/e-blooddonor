#nullable disable
using aspnet_core_api.Models;
using aspnet_core_api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace aspnet_core_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentRepository _appointmentRepository;

        public AppointmentController(IAppointmentRepository appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
        }

       
        // GET: api/Appointment
        [HttpGet]
       
        public async Task<IEnumerable<Appointment>> GetAppointments()
        {
            return await _appointmentRepository.Get();
        }

        // GET: api/Appointment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(Guid id)
        {
            try
            {
                return await _appointmentRepository.Get(id);
            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    Status = "Error",
                    Message = "Couldn't get the Appointment!"
                });
            }
        }

        // PUT: api/Appointment/5
       
        //[HttpPut("{id}")]
        [HttpPut]
        public async Task<IActionResult> PutAppointment(Guid id, [FromBody]Appointment appointment)
        {
            if (id != appointment.Id)
            {
                return BadRequest(new {
                    Status = "Error",
                    Message = "ID not found or mismatch"
                });
            }


            try
            {
                await _appointmentRepository.Update(appointment);
            }
            catch (Exception)
            {
               return BadRequest(new {
                    Status ="Error",
                        Message = "Couldn't update Appointment"
                });
            }

            return Ok(new
            {
                Status = "Success",
                Message =  "Appointment updated successfully"
            });
        }


        // POST: api/Appointment

        [HttpPost]
        public async Task<ActionResult<Appointment>> CreateAppointment([FromBody] Appointment appointment)
        {
            Appointment newAppointment;

            try
            {
                newAppointment = await _appointmentRepository.Create(appointment);
            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    Status = "Error",
                    Message = "Couldn't create Appointment"
                });
            }


            return CreatedAtAction(nameof(GetAppointments), new { id = appointment.Id }, newAppointment);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteAppointment(Guid id)
        {
            try
            {
                await _appointmentRepository.Delete(id);
            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    Status = "Error",
                    Message = "Couldn't delete appointment"
                });
            }

            return Ok(new
            {
                Status = "Success",
                Message = "Appointment deleted successfully!"
            });
        }

    }
}
