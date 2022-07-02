using aspnet_core_api.Models;
using aspnet_core_api.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace aspnet_core_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly UserManager<User> _userManager;
        private readonly IAppointmentRepository _appointmentRepository;

        public UserController(IUserRepository userRepository, UserManager<User> userManager, IAppointmentRepository appointmentRepository)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _appointmentRepository = appointmentRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _userRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Object>> GetUser(string id)
        {
            try
            {
                var user = await _userRepository.Get(id);
                var userRoles = await _userManager.GetRolesAsync(user);
                var appointments = await _appointmentRepository.GetUserAppointments(user.Id);
                var donations = await _appointmentRepository.GetUserDonations(user.Id);

                return new
                {
                    userData = user,
                    userRole = userRoles[0],
                    userAppointments = appointments,
                    userDonations = donations
                };
            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    Status = "Error",
                    Message = "Couldn't get user!"
                });
            }
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser(string id, [FromBody] User user)
        {
            if (id != user.Id)
            {
                return BadRequest(new {
                    Status = "Error",
                    Message = "ID not found or mismatch!"
                });
            }

            try
            {
                await _userRepository.Update(user);
            }
            catch (Exception)
            {
                return BadRequest(new {
                    Status = "Error",
                    Message = "Couldn't update user!"
                });
            }

            return Ok(new
            {
                Status = "Success",
                Message = "User updated successfully!"
            });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(string id)
        {
            try
            {
                await _userRepository.Delete(id);
            }
            catch(Exception)
            {
                return BadRequest(new { 
                    Status = "Error", 
                    Message = "Couldn't delete user!"
                });
            }

            return Ok(new { 
                Status = "Success", 
                Message = "User deleted successfully!" 
            });
        }


        [HttpGet("role/getAllAdmins")]
        public async Task<IEnumerable<Object>> GetAllAdministrators()
        {
            return await _userRepository.GetAdmins(); ;
        }

        [HttpPut]
        [Route("role/setUserRole")]
        public async Task<IActionResult> SetUserRole(string id, string role)
        {
            role = role.ToUpper();

            if (!(role == "USER" || role == "ADMIN" || role == "SUPERADMIN"))
            {
                return BadRequest(new { Message = "Invalid user role" });
            }

            //var user = await _userManager.FindByNameAsync(email);
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return BadRequest(new { Message = "User not found" });
            }

            var roles = await _userManager.GetRolesAsync(user);

            await _userManager.RemoveFromRolesAsync(user, roles.ToArray());
            await _userManager.AddToRoleAsync(user, role);

            return Ok(user);
        }
    }
}
