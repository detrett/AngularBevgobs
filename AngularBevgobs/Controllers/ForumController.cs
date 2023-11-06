using AngularBevgobs.DAL;
using AngularBevgobs.Models;
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


        // This method creates a container for a forum
        public async Task<IActionResult> Container()
        {
            // Get Data
            var forums = await _forumRepository.GetAll();

            // Make ViewModel with Data and return it
            var forumListViewModel = new ForumListViewModel(forums, "Container");
            return View(forumListViewModel);
        }

        // CRUD

        // CREATE
        // Redirect the user to a form to input the data
        [HttpGet]
        public IActionResult Create()
        {     
            return View();
        }     
              
        // Inject data into the DB
        [HttpPost]
        public async Task<IActionResult> Create(Forum forum)
        {
            if (ModelState.IsValid)
            {
                await _forumRepository.Create(forum);
                return RedirectToAction(nameof(Container));
            }
            return View(forum);
        }

        // READ
        // Obtain data from an item based on its id
        public async Task<IActionResult> Details(int id)
        {
            // Get Data
            var item = await _forumRepository.GetForumById(id);

            if (item == null)
            {
                return BadRequest("Forum not found.");
            }

            return View(item);
        }

        // UPDATE
        // Return a Forum object based on its id
        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            var item = await _forumRepository.GetForumById(id);

            if (item == null) 
            {
                return NotFound();
            }
            return View(item);
        }

        // Inject updated data into the DB
        [HttpPost]
        public async Task<IActionResult> Update(Forum forum)
        {
            if (ModelState.IsValid)
            {
                await _forumRepository.Update(forum);

                return RedirectToAction(nameof(Container));
            }
            return View(forum);
        }

        // DELETE
        // Return a Forum object based on its id
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _forumRepository.GetForumById(id);
            if (item == null)
            {
                return NotFound();
            }
            return View(item);
        }

        // Delete data from the DB
        [HttpPost]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _forumRepository.Delete(id);
            return RedirectToAction(nameof(Container));
        }

        public IActionResult Index()
        {
            return View();
        }

    }
}
