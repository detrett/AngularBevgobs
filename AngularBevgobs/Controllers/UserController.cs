using AngularBevgobs.DAL;
using AngularBevgobs.Models;
using Humanizer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;
using System.Reflection.Metadata;
using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Identity;
using AngularBevgobs.Models.DTOs;



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
            Console.WriteLine("[UserController] Data Retrieval OK while executing Get(id)");
            var userDTO = MapToDTO(user);
            return Ok(userDTO);
        }

        // UPDATE
        // Inject updated data into the DB
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ApplicationUser updatedUser)
        {
            if (updatedUser == null)
            {
                return BadRequest("Invalid user data.");
            }
            if (id != updatedUser.Id)
            {
                return BadRequest("Mismatched user ID.");
            }

            var existingUser = await _userRepository.GetUserById(id);
            if (existingUser == null)
            {
                _logger.LogError("[UserController] User not found for updating");
                return NotFound("User not found.");
            }
    
            existingUser.UserName = updatedUser.UserName;
            existingUser.Email = updatedUser.Email;

            // Handle password update
            if (!string.IsNullOrWhiteSpace(updatedUser.Password))
            {
                // Use a password hasher here to hash the new password
                var hashedPassword = _passwordHasher.HashPassword(existingUser, updatedUser.Password);
                existingUser.PasswordHash = hashedPassword;
            }

            bool returnOk = await _userRepository.Update(existingUser);

            if (returnOk)
            {
                var response = new { success = true, message = "User " + id + " updated successfully" };
                return Ok(response);
            }
            else
            {
                _logger.LogError("[UserController] User could not be updated");
                var response = new { success = false, message = "User " + id + " failed to update" };
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
        
        [HttpGet("check-username")]
        public async Task<IActionResult> CheckUsernameAvailability(string username)
        {
            bool exists = await _userRepository.DoesUsernameExist(username);
            return Ok(!exists); 
        }

        public static UserDTO MapToDTO(ApplicationUser u)
        {
            var userDTO = new UserDTO
            {
                CreatedAt = u.CreatedAt,
                Username = u.UserName,
                Rank = u.Rank,
                UserPhoto = u.UserPhoto,
                Threads = u.Threads.Select(t => new ThreadDTO
                {
                    ThreadId = t.ThreadId,
                    UserId = t.UserId,
                    Name = t.Name,
                    CreatedAt = t.CreatedAt,
                    Description = t.Description,
                    ParentId = t.SubforumId,
                    IsLocked = t.IsLocked,
                    IsAnnouncement = t.IsAnnouncement,
                    IsPinned = t.IsPinned,
                    IsFeatured = t.IsFeatured,
                    Comments = t.Comments?.Select(c => new CommentDTO
                    {
                        CommentId = c.CommentId,
                        ThreadId = c.ThreadId,
                        UserId = c.UserId,
                        Title = c.Title,
                        Body = c.Body,
                        CreatedAt = c.CreatedAt,

                    }).ToList()
                }).ToList(),
                UserComments = u.UserComments.Select(c => new CommentDTO
                {
                    CommentId = c.CommentId,
                    ThreadId = c.ThreadId,
                    UserId = c.UserId,
                    Title = c.Title,
                    Body = c.Body,
                    CreatedAt = c.CreatedAt,
                }).ToList()
            };
            return userDTO;
        }
        
    }
}
