#nullable disable
using aspnet_core_api.Models;
using aspnet_core_api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace aspnet_core_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;

        public MessageController(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        // GET: api/Message
        [HttpGet]
        public async Task<IEnumerable<Message>> GetMessages()
        {
            return await _messageRepository.Get();
        }

        // GET: api/Message/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessage(Guid id)
        {
            try
            {
                return await _messageRepository.Get(id);
            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    Status = "Error",
                    Message = "Couldn't get the Message!"
                });
            }
        }

        // PUT: api/Message/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        
        [HttpPut]
        public async Task<IActionResult> PutMessage(Guid id, Message message)
        {
            if (id != message.Id)
            {
                return BadRequest(new
                {
                    Status = "Error",
                    Message = "ID not found or mismatch"
                });
            }

            try
            {
                await _messageRepository.Update(message);
            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    Status = "Error",
                    Message = "Couldn't update Message"
                });
            }

            return Ok(new
            {
                Status = "Success",
                Message = "Message updated successfully"
            }); 
        }

        // POST: api/Message
        
        [HttpPost]
        public async Task<ActionResult<Message>> PostMessage(Message message)
        {
            Message newMessage;

            try
            {
                newMessage = await _messageRepository.Create(message);
            }
            catch (Exception)
            {
                return BadRequest(new{
                    Status = "Erorr",
                    Message = "Couldn't create message"
                });
            }
            return CreatedAtAction(nameof(GetMessages), new { id = message.Id }, newMessage);
        }

        // DELETE: api/Message/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Message>> DeleteMessage(Guid id)
        {
            try
            {
                await _messageRepository.Delete(id);
            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    Status = "Error",
                    Message = "Couldn't delete message"
                });
            }
            return Ok(new
            {
                Status = "Success",
                Message = "Message deleted messages"
            });
        }
    }
}
