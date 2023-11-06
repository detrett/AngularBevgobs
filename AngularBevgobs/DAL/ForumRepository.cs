using AngularBevgobs.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularBevgobs.DAL
{
    public class ForumRepository : IForumRepository
    {
        private readonly ForumDbContext _db;

        public ForumRepository(ForumDbContext db)
        {
            _db = db;
        }
        public async Task Create(Forum forum)
        {
            _db.Forums.Add(forum);
            await _db.SaveChangesAsync();

        }

        public async Task<bool> Delete(int id)
        {
            var item = await _db.Forums.FindAsync(id);
            if (item == null)
            {
                return false;
            }

            _db.Forums.Remove(item);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Forum>?> GetAll()
        {
            return await _db.Forums.ToListAsync();
        }

        public async Task<Forum?> GetForumById(int id)
        {
            return await _db.Forums.FindAsync(id);
        }

        public async Task Update(Forum forum)
        {
            _db.Forums.Update(forum);
            await _db.SaveChangesAsync();
        }
    }
}
