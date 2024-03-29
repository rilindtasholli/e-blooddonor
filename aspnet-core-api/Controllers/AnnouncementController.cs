﻿using aspnet_core_api.Models;
using aspnet_core_api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


using Microsoft.AspNetCore.Mvc;


namespace aspnet_core_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementController : ControllerBase
    {
        private readonly IAnnouncementRepository _announcementRepository;
        public AnnouncementController(IAnnouncementRepository announcementRepository)
        {
            _announcementRepository = announcementRepository;
        }

        [HttpGet("all/{page}")]
        public async Task<ActionResult<Object>> GetAnnouncements(int page)
        {
            return await _announcementRepository.GetAll(page);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Announcement>> GetAnnouncement(Guid id)
        {
            try
            {
                return await _announcementRepository.Get(id);
            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    Status = "Error",
                    Message = "Couldn't get any announcement!"
                });
            }
        }

        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPost]
        public async Task<ActionResult<Announcement>> CreateAnnouncement([FromBody] Announcement announcement)
        {
            Announcement newAnnouncement;

            try
            {
                newAnnouncement = await _announcementRepository.Create(announcement);

            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    Status = "Error",
                    Message = "Couldn't create announcement!"
                });
            }

            return CreatedAtAction(nameof(GetAnnouncement), new { id = newAnnouncement.Id }, newAnnouncement);
        }

        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPut]
        public async Task<ActionResult<Announcement>> UpdateAnnouncement(Guid id, [FromBody] Announcement announcement)
        {
            if (id != announcement.Id)
            {
                return BadRequest(new
                {
                    Status = "Error",
                    Message = "ID not found or mismatch!"
                });
            }

            try
            {
                await _announcementRepository.Update(announcement);
            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    Status = "Error",
                    Message = "Couldn't update announcement!"
                });
            }

            return Ok(new
            {
                Status = "Success",
                Message = "Announcement updated successfully!"
            });
        }

        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Announcement>> DeleteAnnouncement(Guid id)
        {
            try
            {
                await _announcementRepository.Delete(id);
            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    Status = "Error",
                    Message = "Couldn't delete announcement!"
                });
            }

            return Ok(new
            {
                Status = "Success",
                Message = "Announcement deleted successfully!"
            });
        }
    }
}
