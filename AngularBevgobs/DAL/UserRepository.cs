using AngularBevgobs.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularBevgobs.DAL
{
    public class UserRepository : IUserRepository
    {
        private readonly ForumDbContext _db;

        public UserRepository(ForumDbContext db)
        {
            _db = db;
        }
        public async Task Create(ApplicationUser applicationUser)
        {
            _db.Users.Add(applicationUser);
            await _db.SaveChangesAsync();
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

        public async Task Update(ApplicationUser applicationUser)
        {
            _db.Users.Update(applicationUser);
            await _db.SaveChangesAsync();
        }
    }
}
