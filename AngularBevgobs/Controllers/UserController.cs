using AngularBevgobs.DAL;
using AngularBevgobs.Models;
using Humanizer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;
using System.Reflection.Metadata;
using System.Runtime.InteropServices;


namespace AngularBevgobs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        // Injecting the Subforum's Repository
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserRepository userRepository, ILogger<UserController> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        // CRUD

        // CREATE
        [HttpPost("create")]
        public async Task<IActionResult> Create(ApplicationUser applicationUser)
        {
            if (applicationUser == null)
            {
                return BadRequest("Invalid user data.");
            }
            bool returnOk = await _userRepository.Create(applicationUser);

            if (returnOk)
            {
                var response = new { success = true, message = "User " + applicationUser.Id + " created successfully" };
                return Ok(response);
            }
            else
            {
                var response = new { success = false, message = "User " + applicationUser.Id + " creation failed." };
                return Ok(response);
            }


        }

        // READ
        // Obtain data from an item based on its id
        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            // Get Data
            var user = await _userRepository.GetUserById(id);

            if (user == null)
            {
                _logger.LogError("[UserController] User not found while executing Details()");
                return BadRequest("User not found.");
            }

            return Ok(user);
        }

        // UPDATE
        // Inject updated data into the DB
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(ApplicationUser applicationUser)
        {
            if(applicationUser == null)
            {
                return BadRequest("Invalid user data.");
            }
            bool returnOk = await _userRepository.Update(applicationUser);
            
            if (returnOk)
            {
                var response = new { success = true, message = "User " + applicationUser.Id + " updated successfully" };
                return Ok(response);
            }
            else
            {
                _logger.LogError("[UserController] User could not be updated");
                var response = new { success = false, message = "User " + applicationUser.Id + " failed to update" };
                return Ok(response);
            }
        }

        // DELETE
        // Return a Forum object based on its id
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool returnOk = await _userRepository.Delete(id);
            if (!returnOk)
            {
                _logger.LogError("[UserController] User could not be deleted");
                return BadRequest("User deletion failed");
            }
            var response = new { success = true, message = "User " + id.ToString() + " deleted successfully" };
            return Ok(response);

        }

    }
}
