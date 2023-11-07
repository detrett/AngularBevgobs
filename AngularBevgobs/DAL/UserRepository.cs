using AngularBevgobs.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularBevgobs.DAL
{
    public class UserRepository : IUserRepository
    {
        private readonly ForumDbContext _db;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(ForumDbContext db, ILogger<UserRepository> logger)
        {
            _db = db;
            _logger = logger;
        }
        public async Task<bool> Create(ApplicationUser applicationUser)
        {
            try
            {
                _db.Users.Add(applicationUser);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"[UserRepository] User creation failed for user {applicationUser.Id}, error message: {e}");
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _db.Users.FindAsync(id);
            if (item == null)
            {
                return false;
            }

            _db.Users.Remove(item);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<ApplicationUser>?> GetAll()
        {
            return await _db.Users.ToListAsync();
        }

        public async Task<ApplicationUser?> GetUserById(int id)
        {
            return await _db.Users.FindAsync(id);
        }

        public async Task<bool> Update(ApplicationUser applicationUser)
        {
            try
            {
                _db.Users.Update(applicationUser);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"[UserRepository] User creation failed for user {applicationUser.Id}, error message: {e}");
                return false;
            }
        }
    }
}
