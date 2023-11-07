using AngularBevgobs.DAL;
using AngularBevgobs.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;

namespace AngularBevgobs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubforumController : Controller
    {
        // Injecting the Subforum's Repository
        private readonly ISubforumRepository _subforumRepository;
        private readonly ILogger<SubforumController> _logger;

        public SubforumController(ISubforumRepository subforumRepository, ILogger<SubforumController> logger)
        {
            _subforumRepository = subforumRepository;
            _logger = logger;
        }

        // CRUD

        // CREATE
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Subforum newSubforum)
        {
            if (newSubforum == null)
            {
                return BadRequest("Invalid subforum data.");
            }
            bool returnOk = await _subforumRepository.Create(newSubforum);
            if (returnOk)
            {
                var response = new { success = true, message = "Subforum " + newSubforum.Name + " created successfully" };
                return Ok(response);
            }
            else
            {
                var response = new { success = false, message = "Subforum " + newSubforum.Name + " creation failed" };
                return Ok(response);
            }
        }

        // READ
        // Obtain data from an item based on its id
        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            // Get Data
            var subforum = await _subforumRepository.GetSubforumById(id);

            if (subforum == null)
            {
                _logger.LogError("[SubforumController] Subforum not found while executing Details()");
                return BadRequest("Subforum not found.");
            }

            return Ok(subforum);
        }

        // Inject updated data into the DB
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(Subforum newSubforum)
        {
            if (newSubforum == null)
            {
                return BadRequest("Invalid subforum data.");
            }
            bool returnOk = await _subforumRepository.Update(newSubforum);

            if (returnOk)
            {
                var response = new { success = true, message = "Forum " + newSubforum.Name + " updated successfully" };
                return Ok(response);
            }
            else
            {
                _logger.LogError("[SubforumController] Subforum could not be updated");
                var response = new { success = false, message = "Forum " + newSubforum.Name + " failed to update" };
                return Ok(response);

            }
        }

        // DELETE
        // Return a Forum object based on its id
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool returnOk = await _subforumRepository.Delete(id);
            if (!returnOk)
            {
                _logger.LogError("[SubforumController] Subforum could not be deleted");
                return BadRequest("Subforum deletion failed");
            }
            var response = new { success = true, message = "Subforum " + id.ToString() + " deleted successfully" };
            return Ok(response);

        }

    }
}
