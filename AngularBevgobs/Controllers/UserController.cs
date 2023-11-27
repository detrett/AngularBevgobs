using AngularBevgobs.DAL;
using AngularBevgobs.Models;
using Humanizer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;
using System.Reflection.Metadata;
using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Identity;



namespace AngularBevgobs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        // Injecting the Subforum's Repository
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserController> _logger;
        private readonly IPasswordHasher<ApplicationUser> _passwordHasher;

        public UserController(
            IUserRepository userRepository,
            ILogger<UserController> logger,
            IPasswordHasher<ApplicationUser> passwordHasher)
        {
            _userRepository = userRepository;
            _logger = logger;
            _passwordHasher = passwordHasher;
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
        [HttpPut("update/{id}"), DisableRequestSizeLimit]
        public async Task<IActionResult> Update(int id, [FromForm] ApplicationUser updatedUser, [FromForm] IFormFile? profilePicture)
        {
            var existingUser = await _userRepository.GetUserById(id);
            if (existingUser == null)
            {
                return NotFound("User not found.");
            }

            // Update fields only if they are provided
            if (updatedUser.UserName != null)
            {
                existingUser.UserName = !string.IsNullOrWhiteSpace(updatedUser.UserName) ? updatedUser.UserName : existingUser.UserName;
            }
            if (updatedUser.Email != null)
            {
                existingUser.Email = !string.IsNullOrWhiteSpace(updatedUser.Email) ? updatedUser.Email : existingUser.Email;
            }
            if (updatedUser.Password != null)
            {
                existingUser.PasswordHash = !string.IsNullOrWhiteSpace(updatedUser.Password) ? _passwordHasher.HashPassword(existingUser, updatedUser.Password) : existingUser.PasswordHash;
            }
            if (profilePicture != null && profilePicture.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await profilePicture.CopyToAsync(memoryStream);
                    existingUser.UserPhoto = memoryStream.ToArray();
                }
            }

            bool returnOk = await _userRepository.Update(existingUser);

            if (returnOk)
            {
                return Ok(new { success = true, message = "User updated successfully" });
            }
            else
            {
                return BadRequest("User update failed.");
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
        
        [HttpGet("check-username")]
        public async Task<IActionResult> CheckUsernameAvailability(string username)
        {
            bool exists = await _userRepository.DoesUsernameExist(username);
            return Ok(!exists); 
        }
        
    }
}
