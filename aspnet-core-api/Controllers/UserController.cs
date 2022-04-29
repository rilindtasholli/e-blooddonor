using aspnet_core_api.Models;
using aspnet_core_api.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace aspnet_core_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _userRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            try
            {
                return await _userRepository.Get(id);
            }
            catch (Exception)
            {
                return BadRequest(new {
                    Status = "Error",
                    Message = "Couldn't get user!"
                });
            }
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody] User user)
        {
            User newUser;

            try
            {
                newUser = await _userRepository.Create(user);
                
            }
            catch (Exception)
            {
                return BadRequest(new {
                    Status = "Error",
                    Message = "Couldn't create user!"
                });
            }

            return CreatedAtAction(nameof(GetUsers), new { id = newUser.Id }, newUser);
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser(Guid id, [FromBody] User user)
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
        public async Task<ActionResult<User>> DeleteUser(Guid id)
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
    }
}
