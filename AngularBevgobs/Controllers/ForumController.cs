using AngularBevgobs.DAL;
using AngularBevgobs.Models;
using AngularBevgobs.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;

namespace AngularBevgobs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ForumController : Controller
    {
        // Injecting the Forum's Repository
        private readonly IForumRepository _forumRepository;
        private readonly ILogger<ForumController> _logger;

        public ForumController(IForumRepository forumRepository, ILogger<ForumController> logger)
        {
            _forumRepository = forumRepository;
            _logger = logger;
        }

        // CRUD

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var forums = await _forumRepository.GetAll();
            if (forums == null)
            {
                Console.WriteLine("[ForumController] Forum list not found while executing GetAll()");

                _logger.LogError("[ForumController] Forum list not found while executing GetAll()");
                return NotFound("Forum list not found");
            }

            Console.WriteLine("[ForumController] Data Retrieval OK while executing GetAll()");

            var forumDTOs = forums.Select(f => MapToDTO(f));
            return Ok(forumDTOs);
        }

        // CREATE
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Forum newForum)
        {
            if (newForum == null)
            {
                return BadRequest("Invalid forum data.");
            }
            bool returnOk = await _forumRepository.Create(newForum);

            if (returnOk)
            {
                var response = new { success = true, message = "Forum " + newForum.Name + " created successfully" };
                return Ok(response);
            }
            else
            {
                var response = new { success = false, message = "Forum creation failed" };
                return Ok(response);
            }
        }


        // READ
        // Obtain data from an item based on its id
        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            // Get Data
            var forum = await _forumRepository.GetForumById(id);

            if (forum == null)
            {
                _logger.LogError("[ForumController] Forum item not found while executing Details()");
                return BadRequest("Forum not found.");
            }

            return Ok(forum);
        }

        

        // UPDATE
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(Forum newForum)
        {
            if(newForum == null)
            {
                return BadRequest("Invalid forum data.");
            }

            bool returnOk = await _forumRepository.Update(newForum);

            if (returnOk) 
            {
                var response = new { success = true, message = "Forum " + newForum.Name + " updated successfully" };
                return Ok(response);
            }
            else
            {
                _logger.LogError("[ForumController] Forum could not be updated");
                var response = new { success = false, message = "Forum " + newForum.Name + " failed to update" };
                return Ok(response);
            }
        }


        // DELETE
        // Return a Forum object based on its id
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool returnOk = await _forumRepository.Delete(id);
            if(!returnOk)
            {
                _logger.LogError("[ForumController] Forum could not be deleted");
                return BadRequest("Forum deletion failed");
            }
            var response = new { success = true, message = "Forum " + id.ToString() + " deleted successfully" };
            return Ok(response);
        }

        // Method by ChatGPT
        public static ForumDTO MapToDTO(Forum forum)
        {
            var forumDTO = new ForumDTO
            {
                ForumId = forum.ForumId,
                Name = forum.Name,
                Subforums = forum.Subforums?.Select(s => new SubforumDTO
                {
                    SubforumId = s.SubforumId,
                    Name = s.Name,
                    Description = s.Description,
                    BackgroundColor = s.BackgroundColor,
                    CurrentPage = s.CurrentPage,
                    ParentId = forum.ForumId,
                    Threads = s.Threads?.Select(t => new ThreadDTO
                    {
                        ThreadId = t.ThreadId,
                        UserId = t.UserId,
                        Name = t.Name,
                        CreatedAt = t.CreatedAt,
                        Description = t.Description,
                        ParentId = s.SubforumId,
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
                    }).ToList()
                }).ToList()
            };

            return forumDTO;
        }

    }
}
