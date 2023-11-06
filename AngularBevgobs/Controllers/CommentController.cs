using AngularBevgobs.DAL;
using AngularBevgobs.Models;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace AngularBevgobs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : Controller
    {
        // Injecting the Subforum's Repository
        private readonly ICommentRepository _commentRepository;
        private readonly ILogger<CommentController> _logger;

        public CommentController(ICommentRepository commentRepository, ILogger<CommentController> logger)
        {
            _commentRepository = commentRepository;
            _logger = logger;
        }

        // CRUD

        // CREATE
        // Inject data into the DB
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Comment comment)
        {
            Console.WriteLine("In CommentController: Create");

            if (comment == null)
            {
                _logger.LogError("[CommentController] Comment data does not match criteria");
                return BadRequest("Invalid comment data.");
            }
            bool returnOk = await _commentRepository.Create(comment);
            
            if (returnOk)
            {
                var response = new { success = true, message = "Comment " + comment.CommentId + " created successfully." };
                return Ok(response);
            }
            else
            {
                var response = new { success = false, message = "Comment creation failed." };
                return Ok(response);
            }
        }

        // READ
        // Obtain all comments
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            Console.WriteLine("In CommentController: GetAll");

            var comments = await _commentRepository.GetAll();
            if (comments == null)
            {
                _logger.LogError("[CommentController] Comment list not found in GetAll()");
                return NotFound("Comment list not found");
            }
            return Ok(comments);
        }

        // Obtain data from an item based on its id
        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            Console.WriteLine("In CommentController: Details");

            // Get Data
            var comment = await _commentRepository.GetCommentById(id);

            if (comment == null)
            {
                _logger.LogError("[CommentController] Comment not found in Details()");
                return BadRequest("Comment not found.");
            }

            return Ok(comment);
        }

        // UPDATE
        // Inject updated data into the DB
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(Comment comment)
        {
            Console.WriteLine("In CommentController: Update");

            if (comment == null)
            {
                _logger.LogError("[CommentController] Comment not found in Update()");
                return BadRequest("Invalid comment data");
            }
            bool returnOk = await _commentRepository.Update(comment);

            if (returnOk)
            {
                var response = new { success = true, message = $"Comment {comment.CommentId.ToString()} updated succesfully" };
                return Ok(response);
            }
            else
            {
                var response = new { success = false, message = $"Comment {comment.CommentId.ToString()} could not be updated" };
                return Ok(response);
            }
            
        }

        // DELETE
        // Return a Forum object based on its id
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Console.WriteLine("In CommentController: Delete");
            bool returnOk = await _commentRepository.Delete(id);

            if (!returnOk)
            {
                _logger.LogError("[CommentController] Comment could not be deleted");
                return BadRequest("Comment deletion failed");
            }
            var response = new { success = true, message = $"Comment {id.ToString()} deleted succesfully" };
            return Ok(response);

        }
    }
}
