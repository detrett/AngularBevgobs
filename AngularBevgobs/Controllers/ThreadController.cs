using AngularBevgobs.DAL;
using AngularBevgobs.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel.Design;
using System.Threading;
using Thread = AngularBevgobs.Models.Thread;

namespace AngularBevgobs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ThreadController : Controller
    {
        // Injecting the Thread's Repository
        private readonly IThreadRepository _threadRepository;
        private readonly ILogger<ThreadController> _logger;

        public ThreadController(IThreadRepository threadRepository, ILogger<ThreadController> logger)
        {
            _threadRepository = threadRepository;
            _logger = logger;
        }


        // CRUD

        // CREATE
        [HttpPost("create")]
        public async Task<IActionResult> Create(Thread newThread)
        {
            if(newThread == null)
            {
                return BadRequest("Invalid thread data.");
            }

            newThread.Comments = new List<Comment>();

            // Add thread to DB
            bool threadReturnOk = await _threadRepository.Create(newThread);

            var firstComment = new Comment();
            firstComment.Title = newThread.Name;
            firstComment.UserId = newThread.UserId;
            firstComment.Body = newThread.Description;
            firstComment.ThreadId = newThread.ThreadId;
            firstComment.CreatedAt = newThread.CreatedAt;
                     
            bool commentReturnOk = await _threadRepository.CreateComment(firstComment);

            newThread.ParentSubforum = await _threadRepository.GetSubforumById(newThread.SubforumId);

            if(threadReturnOk && commentReturnOk)
            {
                var response = new { success = true, message = "Thread " + newThread.Name + " created successfully" };
                return Ok(response);

            }
            else
            {
                var response = new { success = false, message = "Thread " + newThread.Name + " creation failed" };
                return Ok(response);
            }


        }

        // READ
        // Obtain data from an item based on its id
        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            // Get Data
            var item = await _threadRepository.GetThreadById(id);

            if (item == null)
            {
                _logger.LogError("[ThreadController] Thread not found while executing Details()");
                return BadRequest("Thread not found.");
            }

            return Ok(item);
        }

        // UPDATE
        // Inject updated data into the DB
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(Models.Thread thread)
        {
            if (thread == null)
            {
                return BadRequest("Invalid thread data.");

            }
            bool returnOk = await _threadRepository.Update(thread);

            if (returnOk)
            {
                var response = new { success = true, message = "Thread " + thread.Name + " updated successfully" };
                return Ok(response);
            }
            else
            {
                _logger.LogError("[ThreadController] Thread could not be updated");
                var response = new { success = false, message = "Thread " + thread.Name + " updated successfully" };
                return Ok(response);
            }
        }

        // DELETE
        // Return a Forum object based on its id
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool returnOk = await _threadRepository.Delete(id);
            if (!returnOk)
            {
                _logger.LogError("[ThreadController] Topic could not be deleted");
                return BadRequest("Topic deletion failed");

            }
            var response = new { success = true, message = "Thread " + id.ToString() + " deleted successfully" };
            return Ok(response);

        }
    }
}
