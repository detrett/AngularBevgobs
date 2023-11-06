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

        // This method creates a container for a subforum based on its id
        public async Task<IActionResult> Container(int id)
        {
            // Get Data
            var subforum = await _subforumRepository.GetSubforumById(id);

            // Make ViewModel with Data and return it
            var subforumListViewModel = new SubforumListViewModel(subforum, "Container");
            return View(subforumListViewModel);
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
        public async Task<IActionResult> Create(Subforum subforum)
        {
            if (ModelState.IsValid)
            {
                await _subforumRepository.Create(subforum);
                return RedirectToAction(nameof(Container));
            }
            return View(subforum);
        }

        // READ
        // Obtain data from an item based on its id
        public async Task<IActionResult> Details(int id)
        {
            // Get Data
            var item = await _subforumRepository.GetSubforumById(id);

            if (item == null)
            {
                return BadRequest("Subforum not found.");
            }

            return View(item);
        }

        // UPDATE
        // Return a Forum object based on its id
        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            var item = await _subforumRepository.GetSubforumById(id);

            if (item == null)
            {
                return NotFound();
            }
            return View(item);
        }

        // Inject updated data into the DB
        [HttpPost]
        public async Task<IActionResult> Update(Subforum subforum)
        {
            if (ModelState.IsValid)
            {
                await _subforumRepository.Update(subforum);

                return RedirectToAction(nameof(Container));
            }
            return View(subforum);
        }

        // DELETE
        // Return a Forum object based on its id
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _subforumRepository.GetSubforumById(id);
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
            await _subforumRepository.Delete(id);
            return RedirectToAction(nameof(Container));
        }

        public IActionResult Index()
        {
            return View();
        }

    }
}
