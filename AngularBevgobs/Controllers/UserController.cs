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

        // This method creates a container for a subforum
        public async Task<IActionResult> Container()
        {
            // Get Data
            var users = await _userRepository.GetAll();

            // Make ViewModel with Data and return it
            var userListViewModel = new UserListViewModel(users, "Container");
            return View(userListViewModel);
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
        public async Task<IActionResult> Create(ApplicationUser applicationUser)
        {
            if (ModelState.IsValid)
            {
                await _userRepository.Create(applicationUser);
                return RedirectToAction(nameof(Container));
            }
            return View(applicationUser);
        }

        // READ
        // Obtain data from an item based on its id
        public async Task<IActionResult> Details(int id)
        {
            // Get Data
            var item = await _userRepository.GetUserById(id);

            if (item == null)
            {
                return BadRequest("User not found.");
            }

            return View(item);
        }

        // UPDATE
        // Return a Forum object based on its id
        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            var item = await _userRepository.GetUserById(id);

            if (item == null)
            {
                return NotFound();
            }
            return View(item);
        }

        // Inject updated data into the DB
        [HttpPost]
        public async Task<IActionResult> Update(ApplicationUser applicationUser)
        {
            if (ModelState.IsValid)
            {
                await _userRepository.Update(applicationUser);

                return RedirectToAction(nameof(Container));
            }
            return View(applicationUser);
        }

        // DELETE
        // Return a Forum object based on its id
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _userRepository.GetUserById(id);
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
            await _userRepository.Delete(id);
            return RedirectToAction(nameof(Container));
        }


        public IActionResult Index()
    {
        return View();
    }
    }
}
