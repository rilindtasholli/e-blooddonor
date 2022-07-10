using aspnet_core_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace aspnet_core_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {

        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly Repositories.IAppointmentRepository _appointmentRepository;


        public AuthenticateController(
            UserManager<User> userManager,
            IConfiguration configuration,
            Repositories.IAppointmentRepository appointmentRepository
        )
        {
            _userManager = userManager;
            _configuration = configuration;
            _appointmentRepository = appointmentRepository;

        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            var user = await _userManager.FindByNameAsync(model.Email);

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var token = GetToken(authClaims);

                var appointments = await _appointmentRepository.GetUserAppointments(user.Id);
                var donations = await _appointmentRepository.GetUserDonations(user.Id);

                var userInfo = new
                {
                    userData = user,
                    userRole = userRoles[0],
                    userAppointments = appointments,
                    userDonations = donations
                };

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo.ToUniversalTime(),
                    user = userInfo
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            var email = model.Email;
            var userExists = await _userManager.FindByNameAsync(email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = "User already exists!" });


            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                BloodType = model.BloodType,
                Location = model.Location,
                CreatedDate = DateTime.Now
            };

            try
            {
                await _userManager.CreateAsync(user, model.Password);
                var res = await _userManager.FindByIdAsync(user.Id);
                await _userManager.AddToRoleAsync(res, "USER");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = "User creation failed! Please check user details and try again." });
            }

            return Ok(new { Status = "Success", Message = "User created successfully!" });
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(20),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return token;
        }

        [Authorize]
        [HttpGet]
        [Route("test")]
        public async Task<IActionResult> Test()
        {

            return Ok( new {message = "Success" });
        }
    }
}
