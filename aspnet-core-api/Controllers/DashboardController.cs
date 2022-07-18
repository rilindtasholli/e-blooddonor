using aspnet_core_api.Models;
using aspnet_core_api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace aspnet_core_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardRepository _dashboardRepository;

        public DashboardController(IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("GetDonationsNumber")]
        public async Task<ActionResult<Object>> GetDonationsNumber()
        {
            var donations = await _dashboardRepository.GetAllDonations();

            return new
            {
                donationsNumber = donations.Count()
            };
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("GetMonthlyDonations")]
        public async Task<ActionResult<Object>> GetMonthlyDonations()
        {
            var array = new int[7];

            for (int i = 0; i < 7; i++)
            {
                var date = DateTime.Now.AddMonths(i - 6);
                var month = await _dashboardRepository.GetDonationsByMonth(date.Month);
                array[i] = month.Count();
            }

            return new
            {
                monthlyDonations = array
            };
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("GetLocationDonations")]
        public async Task<ActionResult<Object>> GetLocationDonations()
        {
            var locations = new string[7];
            locations[0] = "Prishtinë";
            locations[1] = "Mitrovicë";
            locations[2] = "Pejë";
            locations[3] = "Prizren";
            locations[4] = "Ferizaj";
            locations[5] = "Gjilan";
            locations[6] = "Gjakovë";

            var array = new int[7];

            for (int i = 0; i < 7; i++)
            {
                var location = await _dashboardRepository.GetDonationsByLocation(locations[i]);
                array[i] = location.Count();
            }

            return new
            {
                locationDonations = array
            };
        }


        // ---------------------------------------------
        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("GetUsersNumber")]
        public async Task<ActionResult<Object>> GetUsersNumber()
        {
            var users = await _dashboardRepository.GetAllUsers();

            return new
            {
                usersNumber = users.Count()
            };
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("GetLocationUsers")]
        public async Task<ActionResult<Object>> GetLocationUsers()
        {
            var locations = new string[7];
            locations[0] = "Prishtinë";
            locations[1] = "Mitrovicë";
            locations[2] = "Pejë";
            locations[3] = "Prizren";
            locations[4] = "Ferizaj";
            locations[5] = "Gjilan";
            locations[6] = "Gjakovë";

            var array = new int[7];

            for (int i = 0; i < 7; i++)
            {
                var location = await _dashboardRepository.GetUsersByLocation(locations[i]);
                array[i] = location.Count();
            }

            return new
            {
                locationDonations = array
            };
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("GetTopDonators")]
        public async Task<ActionResult<Object>> GetTopDonators()
        {
            var users = await _dashboardRepository.GetTopUsers();

            return new
            {
                topDonators = users
            };
        }
    }
}
